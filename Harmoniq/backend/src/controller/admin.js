export const getAdmin = async (req, res) => {
    try {
        res.status(200).json({
            status: "success",
            message: "Admin route is working",
        });
    } catch (error) {
        console.error("Error in getAdmin:", error);
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
}