export const kundaliPipeline=(payload)=>[
 [
      { $match: { status:payload.status } },


      // Join user
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },

    //   {
    //     $match: {
    //       $or: [
    //         { "user.name": { $regex: payload.search, $options: "i" } },
    //         { "astrologer.name": { $regex: payload.search, $options: "i" } },
    //         { consultationType: { $regex: payload.search, $options: "i" } },
    //       ],
    //     },
    //   },

      // Select final fields
      {
        $project: {
          userName: "$user.name",
          astrologerName: "$astrologer.name",
          gender: 1,
          dateOfBirth: 1,
          timeOfBirth: 1,
          kundaliData: "$kundliData.data",
          userEmail: "$user.email",


        },
      },

      // Sort by date (newest first)
      { $sort: { date: -1 } },

      // Pagination
      { $skip: payload.skip || 0 },
      { $limit: payload.limitNumber || 5  },
    ]
]