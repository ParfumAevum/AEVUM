// ══════════════════════════════════════════════════════════════
// src/seed.ts
// Popula o banco de dados com dados iniciais de teste.
// Execute: npm run db:seed
// ══════════════════════════════════════════════════════════════

import prisma from "./lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  console.log("🌱 Iniciando seed do banco de dados...");

  // ─── Categorias ─────────────────────────────────────────────
  const categorias = await Promise.all([
    prisma.categoria.upsert({
      where: { nome: "Parfum" },
      update: {},
      create: { nome: "Parfum" },
    }),
    prisma.categoria.upsert({
      where: { nome: "Eau de Parfum" },
      update: {},
      create: { nome: "Eau de Parfum" },
    }),
    prisma.categoria.upsert({
      where: { nome: "Conjuntos" },
      update: {},
      create: { nome: "Conjuntos" },
    }),
  ]);

  console.log("✅ Categorias criadas:", categorias.map((c) => c.nome));

  // ─── Usuário Admin ──────────────────────────────────────────
  const senhaAdmin = await bcrypt.hash("admin123", 10);
  const admin = await prisma.usuario.upsert({
    where: { email: "admin@aevum.com" },
    update: {},
    create: {
      nome: "Administrador AEVUM",
      email: "admin@aevum.com",
      senha: senhaAdmin,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin criado:", admin.email);

  // ─── Usuário Cliente de Teste ────────────────────────────────
  const senhaCliente = await bcrypt.hash("cliente123", 10);
  const cliente = await prisma.usuario.upsert({
    where: { email: "cliente@aevum.com" },
    update: {},
    create: {
      nome: "Helena Aevum",
      email: "cliente@aevum.com",
      senha: senhaCliente,
      telefone: "(81) 99999-9999",
      role: "CLIENTE",
    },
  });

  console.log("✅ Cliente criado:", cliente.email);

  // ─── Produtos ────────────────────────────────────────────────
  const parfumId = categorias[0].id;
  const edpId = categorias[1].id;

  const produtos = [
    {
      nome: "L'Obsidienne Noire",
      sku: "AEV-OBN-100",
      descricao: "Uma fragrância densa e misteriosa que evoca a profundeza da noite.",
      notas: "Sândalo • Incenso • Oud",
      preco: 285,
      estoque: 48,
      imagem: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUTbQlDdvXimti3apJvKLXdr7MUQ6fmrLQHVMXWsOR-VptoLtRsPfIJrRo9LQLuKW9UcQ035eUVOKJ3i7tM-5O2jvxCnDfRvMHX4Df-ygDxgSh0DUXBDNKO7YH8_6xD6DDijRNXXrppjBACsCg8ae60i6lcyWQ2hgSMEkhiURnILiGQMOL6smzJA_Riy4Phl0VjlMl9hv-CsINmvO8vhtt8ffeiEjEatLUoJpZxaZNNOZ9B3KDxofMy7dpyiOjIPuiPO4hqr7Fw6M",
      categoriaId: parfumId,
    },
    {
      nome: "Temple of Silence",
      sku: "AEV-TOS-050",
      descricao: "O silêncio sagrado capturado em uma fragrância transcendente.",
      notas: "Mirra • Âmbar • Baunilha",
      preco: 310,
      estoque: 32,
      imagem: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1mF4xlnT9Q_x0eXHorIJzihJlJuAV-ieOC7g9VBI5UkSC5vnWxMdnjCd5JiY1yq5E9kYsdiNb2EpTJo4xawiVeu0rvwFeTy7l_5bNv1_ABYWV35xlKYMPeuQ1dy5PClmFCkc2ZY_d34edVnD-V-64tHlbpSt7BftP5yZdtIJjlDMq45kzRnO_kb1RHZcimVnz7ijcDkd8_NaYSKv2J2DsUX86o1a-ztRfXO3JbjKjKu1zt-OMxdROdrkehmaaqUCIukGbOqXQevw",
      categoriaId: edpId,
    },
    {
      nome: "Velvet Horizon",
      sku: "AEV-VEH-100",
      descricao: "A suavidade do horizonte ao entardecer em uma composição única.",
      notas: "Rosa • Cedro • Almíscar",
      preco: 245,
      estoque: 61,
      imagem: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSxLDapIK7DMLpCJrcycO2Z6pPq9OFFkRb4JK62Ukdr8va1A6bIgRMhNKdI2oy8pSJTPc1hVicMZtRtRT6N6LDZRa6GVDh-RZzr9QBL86NF_powVE3k2eGIyev8DBo_5ZQhh-xknqOZySOJQ7jIrjL_BRV-QpjLN4HcywxAoVEGm7UIDAsQuyXEmoGx1VWo1gCA6PqxpuQyzOTFnks5f7QOwgPJcMFXusWcnAQXGb885HI0qlzbCczwAUxkRpjAl6CFHr7sBGpaDA",
      categoriaId: edpId,
    },
    {
      nome: "Midnight Saffron",
      sku: "AEV-MIS-050",
      descricao: "O ouro vermelho do Oriente em uma fragrância de rara intensidade.",
      notas: "Açafrão • Patchouli • Âmbar",
      preco: 187,
      estoque: 14,
      imagem: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCEWabo0fzLAVT6mwzIHJ3KEEe07iBnxHmkehbVPhh9aAK-QkGcvYQ_ijA-Nye2HqXG2txREJ-gYAGnQLSL6acwcIg590yQFT-9YBWPlmfTmMXR292_YKbr9VnkeaLfkJ9gHTmc4jQ1lcCIJHwbjwoRoAGQ5OBdfZML58jf1Yh7WmnZbHNovNz_kz6T1QSd82rHoDVzHd1kFNdUx8aT7JQYa4qDr9usDUttSaDbHqcJMsqhzTFqKtMRPPVVHe79_vUWBv91jTJSUo",
      categoriaId: parfumId,
    },
    {
      nome: "Imperial Musk",
      sku: "AEV-IMP-100",
      descricao: "O almíscar imperial em toda sua glória e refinamento.",
      notas: "Almíscar • Âmbar Branco • Sândalo",
      preco: 232,
      estoque: 27,
      imagem: "https://lh3.googleusercontent.com/aida-public/AB6AXuDziOaLM9wwnB_W_eeIMOFTEgp_N91XB3pcr36b7OFD9vDL8pbKUH3iGkjTTpfkNTS53o1xY04e1SmUKXdfj0aX4S7Xokd8mesTRrpWDsJ28nsLYuo5ELmTZKybaerbVqqHemMDe_c4ux530dmI2mRZCogVfbUJg6jHdVKkRjGQTOHjOy_aRT0srYiUOryA-xVoWi1S1l_R9jtctXb01rjgit1n35FbwLVId-lcEoUc139eqboi4u47PRVJWEXTGWOX1rTiiXF0jco",
      categoriaId: edpId,
    },
    {
      nome: "Oceanic Amber",
      sku: "AEV-OCA-050",
      descricao: "O âmbar das profundezas do oceano em uma fragrância única.",
      notas: "Âmbar • Sal Marinho • Cedro",
      preco: 202,
      estoque: 8,
      imagem: "https://lh3.googleusercontent.com/aida-public/AB6AXuAA2KICocmhqMHMKr_W2b7JmoagLACD4OvjMG7w7P9QPpgcGj7B6-riOgvXi57SniLS9rm6amuyq3TNrGx8E9nDaIO96GOZ8kHCllF7Inm_FocTv7F9LUpfSxRj8UT7UC3TwbcdSKJp_NqB1FqUoY5PkYbj5eFz7iLH8hH2DdXjckCaLHrR1pHixhbAzpz0CrUGOOTBHW6XNsmwdGYHD0eT7_ulvjpx7XKpK8F2LCIXQHNetdVpynDNsCEy3_QDgi3S2sPu52oQKB8",
      categoriaId: parfumId,
    },
  ];

  for (const produto of produtos) {
    await prisma.produto.upsert({
      where: { sku: produto.sku },
      update: {},
      create: produto,
    });
  }

  console.log("✅ Produtos criados:", produtos.length);
  console.log("\n🎉 Seed concluído com sucesso!\n");
  console.log("📋 Credenciais de acesso:");
  console.log("   Admin:   admin@aevum.com  / admin123");
  console.log("   Cliente: cliente@aevum.com / cliente123\n");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());