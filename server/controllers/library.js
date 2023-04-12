const Library = require("../models/libraryCard");

const QUERY_LIMIT = 12; // Maximum number of records that server response with at once

const pageSkip = (querry_page) => {
    const page = Number(querry_page) || 1;
    return (page - 1) * QUERY_LIMIT;
};

const getAllLibrary = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const { name } = req.query;

    const queryObj = { name: { $regex: name || "", $options: "i" } };

    const count = await Library.countDocuments(queryObj);
    const totalPages = Math.ceil(count / QUERY_LIMIT);

    const data = await Library.find(queryObj)
        .limit(QUERY_LIMIT)
        .skip(pageSkip(page));

    res.status(200).json({
        page,
        perPage: data.length,
        count,
        totalPages,
        data,
    });
};

module.exports = { getAllLibrary };
