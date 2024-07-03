const getAllBookPlaces = require("../../controllers/BOOKPLACES/bookPlaces_get_controllers").getAllBookPlaces;
const BookPlace = require("../../db/models/bookPlaces");

jest.mock("../../db/models/bookPlaces");

describe("getAllBookPlaces", () => {
    it("should be return all bookPlaces", async () => {
        const mockBookPlaces = [
            { name: "BookPlace1", status: "accept" },
            { name: "BookPlace2", status: "pending" }
        ];

        const mockFind = {
            populate: jest.fn().mockResolvedValue(mockBookPlaces)
        };

        BookPlace.find.mockReturnValue(mockFind);

        const mockReq = {};
        const mockRes = {
            json: jest.fn()
        };
        const mockNext = jest.fn();

        await getAllBookPlaces(mockReq, mockRes, mockNext);

        expect(mockRes.json).toHaveBeenCalledWith({
            result: true,
            bookPlaces: mockBookPlaces
        });
    });

    // it("devrait appeler next avec une erreur si aucun bookPlace n'est trouvé", async () => {
    //     const mockFind = {
    //         populate: jest.fn().mockResolvedValue(null)
    //     };
    //
    //     BookPlace.find.mockReturnValue(mockFind);
    //
    //     const mockReq = {};
    //     const mockRes = {
    //         json: jest.fn()
    //     };
    //     const mockNext = jest.fn();
    //
    //     await getAllBookPlaces(mockReq, mockRes, mockNext);
    //
    //     expect(mockNext).toHaveBeenCalledWith(new Error("BookPlaces not found"));
    // });
});
