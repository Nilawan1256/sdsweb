offset = page(7) * pageSize(20)
limit = pageSize(20)

let paginate = (query, { page, pageSize }) => {
let offset = page * pageSize;
let limit = pageSize;

  return {
    ...query,
    offset,
    limit,
  };
};

model.findAll(
  paginate(
    {
      where: {}, // conditions
    },
    { page, pageSize },
  ),
);