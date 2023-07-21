const{ getItem,login,postItem,register,forgotPass,postCategories,getCategories ,postCart,getCart,deleteCart,getItemFav,updateFav}=require('../controller/index')
const routes = (app)=>{
    app.get('/',getItem),
    app.post('/',postItem),
    app.post('/register',register ),
    app.post('/login',login),
    app.post('/forgot',forgotPass),
    app.post('/categories',postCategories ),
    app.get('/categories',getCategories ),
    app.post('/cart', postCart),
    app.get('/cart', getCart),
    app.delete('/cart', deleteCart),
    app.get('/fav',getItemFav),
    app.post('/fav',updateFav)
}   
module.exports = routes