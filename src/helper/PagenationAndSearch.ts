import { searchPagination, CrossDbPaginateOptions } from "../types";

export const paginationAndSearch = async ({
    page = 1,
    limit = 10,
    searchFields = [],
    searchKeyword = '',
    filter = {},
    model
}: searchPagination) => {
    let skip = (page - 1) * limit;
    let searchQuery = filter;
    if (searchFields?.length && searchKeyword) {
        searchQuery = {
            ...filter,
            $or: searchFields.map((field) => ({
                [field]: {
                    $regex: searchKeyword, $options: "i"
                }
            }))
        };
    }
    const [data, total] = await Promise.all([
        (await model.find(searchQuery).sort({_id:-1}).skip(skip).limit(limit)),
        model.countDocuments(searchQuery)
    ]);
    let totalpage = Math.ceil(total / limit);
    return ({
        data,
        paginationData: {
            totalLength: total,
            currentPage: page,
            totalPage: totalpage
        }
    });
}


export const crossDbPaginateLookup = async ({
    model,
    fromCollection,
    localField,
    foreignField,
    as,
    match = {},
    project = {},
    page = 1,
    limit = 10,
    sort = { _id: -1 }
}: CrossDbPaginateOptions) => {
    const skip = (page - 1) * limit;

    const pipeline: any[] = [
        {
            $lookup: {
                from: fromCollection,
                localField,
                foreignField,
                as
            }
        },
        {
            $unwind: {
                path: `$${as}`,
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $match: match
        },
        {
            $sort: sort
        },
        {
            $skip: skip
        },
        {
            $limit: limit
        }
    ];

    if (Object.keys(project).length > 0) {
        pipeline.push({ $project: project });
    }

    const countPipeline = [
        ...pipeline.slice(0, 3), // lookup, unwind, match
        { $count: 'total' }
    ];

    const [data, totalResult] = await Promise.all([
        model.aggregate(pipeline),
        model.aggregate(countPipeline)
    ]);

    const total = totalResult[0]?.total || 0;

    return {
        data,
        total,
        page,
        limit
    };
};