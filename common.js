const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");


module.exports = {prisma, express};