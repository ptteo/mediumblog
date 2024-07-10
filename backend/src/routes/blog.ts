import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {  verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@pt12/medium-common";


export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Define the interface for the JWT payload
interface JwtPayload {
  id: string;
  // Add other properties if your JWT contains more information
}

// Middlewares
blogRouter.use('/*', async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  if (!authHeader) {
    c.status(403);
    return c.json({ message: "Authorization header missing" });
  }

  try {
    const token = authHeader.split(' ')[1];
    const user = await verify(token, c.env.JWT_SECRET) as unknown as JwtPayload;

    if (user && user.id) {
      c.set("userId", user.id); // TypeScript ensures user.id is a string
      await next();
    } else {
      c.status(403);
      return c.json({ message: "You are not logged in!" });
    }
  } catch (error) {
    c.status(403);
    return c.json({ message: "Invalid token" });
  }
});


blogRouter.post('/', async (c) => {
  const body = await c.req.json();
  const {success} = createBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message: "Inputs are incorrect"
    })
  }
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	
	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: userId
		}
	});
	return c.json({
		id: post.id
	});
})


blogRouter.put('/', async (c) => {
  const body = await c.req.json();

  const {success} = updateBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message: "Inputs are incorrect"
    })
  }
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	
	await prisma.post.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.text('updated post');
});

// todo add pagination
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany({});

  return c.json(blogs);
});


blogRouter.get("/:id", async (c) => {
  const id = c.req.param('id');
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.post.findFirst({
    where: {
      id
    }
  })
  return c.json(post)
 
});


