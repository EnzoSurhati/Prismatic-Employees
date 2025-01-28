const { express, prisma } = require("../common");
const router = express.Router();

router.use(express.json());

router.get("/employees", async (req, res) => {
  try {
    const result = await prisma.employee.findMany();
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json("Nothing...");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/addEmployee", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).send("No name was provided");
    }
    const employeeAdded = await prisma.employee.create({
      data: {
        name,
      },
    });
    if (employeeAdded) {
      res.status(201).json(employeeAdded);
    } else {
      res.status(404).json("Employee was not added");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/employees/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const employeeFound = await prisma.employee.findFirst({
      where: {
        id,
      },
    });
    if (employeeFound) {
      res.status(200).json(employeeFound);
    } else {
      res.status(404).json("Employee was not found");
    }
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});

router.put("/employees/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Required valid name" });
  }
  try {
    const result = await prisma.employee.update({
      where: { id: +id},
      data: { name },
    });
    res.status(200).json(result);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Employee was not found" });
    } else {
      console.log(error);
    }
  }
});

router.delete("/employees/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const employeeToDelete = await prisma.employee.findUnique({
      where: {
        id,
      },
    });
    console.log("Who to delete:", employeeToDelete);
    if (!employeeToDelete) {
      res.status(404).send("Employee was not found");
    }
    const deleteEmployee = await prisma.employee.delete({
      where: {
        id,
      },
    });

    if (deleteEmployee) {
      res.status(200).json(deleteEmployee);
    } else {
      res.status(404).send("Employee not deleted");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", (req, res) => {
  res.status(200).send("Welcome to the Prismatic Employees API.");
});

module.exports = router;
