require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL
});

async function main() {
  // ======== AUTORES NOVOS ========
  const author1 = await prisma.author.create({
    data: { name: "Frank Herbert", nationality: "American", birthYear: 1920 }
  });

  const author2 = await prisma.author.create({
    data: { name: "Horacio Quiroga", nationality: "Uruguayan", birthYear: 1878 }
  });

  const author3 = await prisma.author.create({
    data: { name: "Jane Austen", nationality: "British", birthYear: 1775 }
  });

  const author4 = await prisma.author.create({
    data: { name: "Haruki Murakami", nationality: "Japanese", birthYear: 1949 }
  });

  const author5 = await prisma.author.create({
    data: { name: "Gabriel García Márquez", nationality: "Colombian", birthYear: 1927 }
  });

  // ======== LIVROS ========
  await prisma.book.createMany({
    data: [
      // Frank Herbert
      { title: "Dune", year: 1965, genre: "science fiction", available: true, authorId: author1.id },
      { title: "Dune Messiah", year: 1969, genre: "science fiction", available: true, authorId: author1.id },
      { title: "Children of Dune", year: 1976, genre: "science fiction", available: true, authorId: author1.id },

      // Horacio Quiroga
      { title: "Martin Fierro", year: 1872, genre: "poetry", available: true, authorId: author2.id },
      { title: "Cuentos de la selva", year: 1918, genre: "short stories", available: true, authorId: author2.id },

      // Jane Austen
      { title: "Pride and Prejudice", year: 1813, genre: "romance", available: true, authorId: author3.id },
      { title: "Sense and Sensibility", year: 1811, genre: "romance", available: true, authorId: author3.id },
      { title: "Emma", year: 1815, genre: "romance", available: true, authorId: author3.id },
      { title: "Persuasion", year: 1817, genre: "romance", available: true, authorId: author3.id },

      // Haruki Murakami
      { title: "Kafka on the Shore", year: 2002, genre: "magical realism", available: true, authorId: author4.id },
      { title: "Norwegian Wood", year: 1987, genre: "romance", available: true, authorId: author4.id },
      { title: "1Q84", year: 2009, genre: "fiction", available: true, authorId: author4.id },

      // Gabriel García Márquez
      { title: "One Hundred Years of Solitude", year: 1967, genre: "magical realism", available: true, authorId: author5.id },
      { title: "Love in the Time of Cholera", year: 1985, genre: "romance", available: true, authorId: author5.id },
      { title: "Chronicle of a Death Foretold", year: 1981, genre: "fiction", available: true, authorId: author5.id }
    ]
  });

  console.log("✅ Seed completa executada com novos autores e livros!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });