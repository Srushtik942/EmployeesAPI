const request = require('supertest');
const http = require('http');
const { getAllEmployees, getEmployeeById } = require('../controllers');
const { app } = require('../index.js');

jest.mock('../controllers', () => ({
  ...jest.requireActual('../controllers'),
  getAllEmployees: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3000);
});
afterAll(async () => {
  server.close();
});

describe('Controller Function test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return all employees', async () => {
    let mockEmployees = [
      {
        employeeId: 1,
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: 'Priya Singh',
        email: 'priya.singh@example.com',
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: 'Ankit Verma',
        email: 'ankit.verma@example.com',
        departmentId: 1,
        roleId: 3,
      },
    ];
    getAllEmployees.mockReturnValue(mockEmployees);
    let result = getAllEmployees();
    expect(result).toEqual(mockEmployees);
    expect(result.length).toBe(3);
  });
});

describe('Api Endpoints', () => {
  it('should return 200 for all the employees', async () => {
    const res = await request(server).get('/employees');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      employees: [
        {
          employeeId: 1,
          name: 'Rahul Sharma',
          email: 'rahul.sharma@example.com',
          departmentId: 1,
          roleId: 1,
        },
        {
          employeeId: 2,
          name: 'Priya Singh',
          email: 'priya.singh@example.com',
          departmentId: 2,
          roleId: 2,
        },
        {
          employeeId: 3,
          name: 'Ankit Verma',
          email: 'ankit.verma@example.com',
          departmentId: 1,
          roleId: 3,
        },
      ],
    });
    expect(res.body.employees.length).toBe(3);
  });
  it('should be return details of particular employee by Id', async () => {
    const res = await request(server).get('/employees/details/1');
    expect(res.status).toBe(200);
    expcet(res.body).toEqual({
      employeeId: 1,
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      departmentId: 1,
      roleId: 1,
    });
  });
});
