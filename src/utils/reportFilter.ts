export default function reportFilter(data, talentGroupFilter, locationFilter) {
  var newData = []
  data.forEach((item) => {
    if (talentGroupFilter != "All") {
      if (locationFilter != "All") {
        // Both filters are applied
        if (
          item.properties.Location_Name == locationFilter &&
          item.properties.Talent_Group == talentGroupFilter
        ) {
          newData.push(item)
        }
      } else {
        // Only filter by talentGroup
        if (item.properties.Talent_Group ==  talentGroupFilter) {
          newData.push(item)
        }
      }
    } else if (locationFilter != "All") {
      // Only filter by location
      if (item.properties.Location_Name == locationFilter) {
        newData.push(item)
      }
    } else {
      // No filters applied
      newData.push(item)
    }
  });

  return newData
}