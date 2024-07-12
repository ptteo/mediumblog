import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signupInput, signinInput } from "@pt2024/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const { success, error } = signupInput.safeParse(body);
  console.log("Signup Input Validation Result:", success, error);
  if (!success) {
    return c.json(
      {
        message: "Inputs not correct",
        error: error?.format(),
      },
      400
    );
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    console.log("Creating user with data:", body);
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name,
      },
    });
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.text(jwt);
  } catch (e) {
    console.error("Error during signup:", e);
    return c.json({ message: "Server error" }, 500);
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const { success, error } = signinInput.safeParse(body);
  console.log("Signin Input Validation Result:", success, error);
  if (!success) {
    return c.json(
      {
        message: "Inputs not correct",
        error: error?.format(),
      },
      400
    );
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    console.log("Searching for user with username:", body.username);
    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
        password: body.password,
      },
    });
    if (!user) {
      return c.json(
        {
          message: "Incorrect credentials",
        },
        403
      );
    }
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.text(jwt);
  } catch (e) {
    console.error("Error during signin:", e);
    return c.json({ message: "Server error" }, 500);
  }
});

export default userRouter;
