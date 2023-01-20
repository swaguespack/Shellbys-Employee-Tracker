USE company_db;

INSERT INTO department (name)
VALUES 
("Natural Resources"),
("Community Development"),
("Transportation"),
("Research & Analytics");

INSERT INTO roles (title, salary, department_id)
VALUES 
("Department Manager", 120000, 1),
("Director", 190000, 1),
("Lead Engineer", 90000, 3),
("Data Analyst", 60000, 2),
("Planner", 70000, 2),
("Administrative Professional", 50000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
("Samantha", "Piper", 1, null),
("Pamela", "Brint", 4, 3),
("Kate", "Moss", 3, null),
("Betsy", "Ross", 5, null),
("Lars", "Hurst", 6, null),
("Gary", "Morris", 3, null),
("Tim", "Gardener", 4, 6),
("Celine", "Dion", 1, 1);