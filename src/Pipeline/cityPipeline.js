export const cityPipeline = (matchStage = {})=>[
      { $match: matchStage },
      {
        $lookup: {
          from: "states",
          localfield: "stateId",
          foreignField: "_id",
          as: "state",
        },
      },
      {
        $unwind: { path: "$state", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "countries",
          localfield: "countryId",
          foreignField: "_id",
          as: "country",
        },
      },
      { $unwind: { path: "$country", preserveNullAndEmptyArrays: true } },
      { $skip: Number(skip) },
      { $limit: Number(limit) },
]
