import User from "../models/User.js";

// @desc    Update user score
// @route   PUT /api/users/:id/score
// @access  Private
export const updateUserScore = async (req, res) => {
  try {
    const { score, quizId } = req.body;
    const userId = req.params.id;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $inc: { score, totalQuizzes: 1 },
      },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Score updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("Update score error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating score",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Mark topic as completed
// @route   PUT /api/users/:id/completed-topics
// @access  Private
export const addCompletedTopic = async (req, res) => {
  try {
    const { topicId } = req.body;
    const userId = req.params.id;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { completedTopics: topicId },
      },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Topic marked as completed",
      data: user,
    });
  } catch (error) {
    console.error("Add completed topic error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating completed topics",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Get user stats
// @route   GET /api/users/:id/stats
// @access  Private
export const getUserStats = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        score: user.score,
        totalQuizzes: user.totalQuizzes,
        completedTopics: user.completedTopics,
        averageScore:
          user.totalQuizzes > 0
            ? (user.score / user.totalQuizzes).toFixed(2)
            : 0,
      },
    });
  } catch (error) {
    console.error("Get user stats error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching user stats",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
