import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });
const PORT: number = 3001;

app.use(cors());
app.use(express.json());

app.get('/health', async (req: Request, res: Response) => {
  try {
    const userCount: number = await prisma.user.count();
    res.json({
      status: "Online",
      database: "Conectado",
      users: userCount
    });
  } catch (error: any) {
    res.status(500).json({
      status: "Erro",
      message: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor AEVUM rodando em http://localhost:${PORT}`);
});