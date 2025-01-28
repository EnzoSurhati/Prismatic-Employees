const { prisma } = require("../common");
const seed = async () => {
  const employees = [
    { name: "Enzo" },
    { name: "Alex" },
    { name: "John" },
    { name: "Michael" },
    { name: "Max" },
    { name: "Alice" },
    { name: "Gina" },
    { name: "Samuel" },
    { name: "Lawrence" },
    { name: "Eddy" },
  ];
  await prisma.employee.createMany({ data: employees });
};
seed();
