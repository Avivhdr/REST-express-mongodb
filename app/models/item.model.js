module.exports = (mongoose) => {
  const item = mongoose.model(
    "item",
    mongoose.Schema(
      {
        title: String,
        description: String,
        isAvailable: Boolean,
      },
      { timestamps: true },
    ),
  );

  return item;
};
