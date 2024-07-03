const getAllUsers = require('../../controllers/USERS/users_get_controllers').getAllUsers;
const User = require('../../db/models/users');

jest.mock('../../db/models/users');

describe('getAllUsers', () => {
    it('should return all users', async () => {
        const mockUsers = [
            { name: 'User1', premium: true },
            { name: 'User2', premium: false }
        ];

        User.find.mockResolvedValue(mockUsers);

        const mockReq = {};
        const mockRes = {
            json: jest.fn()
        };
        const mockNext = jest.fn();

        await getAllUsers(mockReq, mockRes, mockNext);

        expect(mockRes.json).toHaveBeenCalledWith({
            result: true,
            users: mockUsers,
            usersPremium: [mockUsers[0]]
        });
    });
});