In the project directory, you can run:
### `npm start`

1. The project is setup in MaterialUI Library.
2. Project intends to fetch data from API and dispay them into table.
3. Further we have action button on click of which two actions can be done Edit and Delete.
4. On click of Edit a modal pops up which has textfields with table row values Name, age, city, pincode. We can also Edit this field where on click of save the data is getting edited.
5. On click of delete a modal pops up which asks a prompt to confirm, then on confirming delete the data gets deleted.
6. Also added pagination where in one page maximum of 5 entries are visible and have adjusted the serial number accordingly.
7. Since the Id was not coming from the data I have injected the Id from my end to use s.no properly
8. In order to mutate data I have used local storage to save the updated data and added a condition that if there are items in localstorage fetch data from localstorage otherwise fetch data from API.
9. Also was aware of the fact that if data gets updated in the API it will cause issues but for this usecase I have used localStorage to store the updated data so that we dont lose updated values aftr refreshing.

