exports.sortbyMonth = async (schema, monthVal) => {
  let filteredResult = await schema.aggregate([
    { $project: { month: { $month: '$orderDate' } } },
    { $match: { month: Number(monthVal) } }
  ])
  const idArr = filteredResult.map(el => el._id)
  return query = schema.find({ "_id": { $in: idArr } })
}

exports.filterByMonth = async (schema, param) => {
  const start = new Date(param.year, param.month - 1, 1);
  const end = new Date(param.year, param.month, 1);

  let result = await schema.find({
    orderDate: { $gte: start, $lt: end }
  });

  return titleArray = result.map(el => el.orderTitle)
}

exports.count = (arr) => {
  let o = {}, i;
  for (i = 0; i < arr.length; ++i) {
    if (o[arr[i]]) ++o[arr[i]];
    else o[arr[i]] = 1;
  }
  return o;
}

exports.weight = (arr_in) => {
  let o = this.count(arr_in),
    arr = [], i;
  for (i in o) arr.push({ value: i, weight: o[i] });
  arr.sort(function (a, b) {
    return a.weight < b.weight;
  });
  return arr;
}

exports.searchFilter = (schema, queryParam) => {
  let regex = new RegExp(queryParam, 'i');
  return query = schema.find({ 'name': regex });
}
