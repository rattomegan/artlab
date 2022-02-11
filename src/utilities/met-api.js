export async function fetchAllItems(searchTerm, firstIndex, lastIndex) {
  console.log(firstIndex, lastIndex)
  const res  = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchTerm}`).then(res => res.json())
  const objectIDs = res.objectIDs.splice(firstIndex, lastIndex)
  const promiseArray = objectIDs.map((id) => {
    return fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`).then(res => res.json())
  })
  const promiseItems = await Promise.all(promiseArray)
  const allItems = {
    total: res.total,
    items: promiseItems
  }
  return allItems
}
