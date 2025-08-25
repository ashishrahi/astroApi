export const bookingListPipeline = ({ status, search = "" }, skip = 0, limitNumber = 5)=>
     [
      { $match: { status } },
    
      //  join astrologer
      {
        $lookup: {
          from: "astrologers",
          localField: "astrologerId",
          foreignField: "_id",
          as: "astrologer",
        },
      },
      { $unwind: "$astrologer" },

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

      // Search filter (case-insensitive) across multiple fields
      {
        $match: {
          $or: [
            { "user.name": { $regex: search, $options: "i" } },
            { "astrologer.name": { $regex: search, $options: "i" } },
            { consultationType: { $regex: search, $options: "i" } },
          ],
        },
      },

      // Select final fields
      {
        $project: {
          userName: "$user.name",
          astrologerName: "$astrologer.name",
          consultationType: 1,
          date: 1,
          time: 1,
          purpose: 1,
          paymentStatus: 1,
          status: 1,
        },
      },

      // Sort by date (newest first)
      { $sort: { date: -1 } },

      // Pagination
      { $skip: skip },
      { $limit: limitNumber },
    ];