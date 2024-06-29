require('dotenv').config()
const express = require('express') 
const app = express()
const port = process.env.PORT 

app.use(express.json())

app.listen(port, ()=>{
    console.log(`I'm istening to port ${port}`)
})

let realEstates = [
    {
        id: 1,
        name: 'five bedroom duplex',
        count: 10,
        location: 'ikoyi',
        status: 'active',
        isCofO: true,
        isFenced: true,
        price: 40000
    },
    {
        id: 2,
        name: 'abbey',
        location: 'lekki',
        count: 10,
        status: 'active',
        isCofO: true,
        isFenced: true,
        price: 20000
    },
    {
        id: 3,
        name: 'aqueduct',
        location: 'ajah',
        count: 10,
        status: 'pending',
        isCofO: true,
        isFenced: true,
        price: 25000
    },
    {
        id: 4,
        name: 'bowling alley',
        location: 'egbeda',
        count: 10,
        status: 'pending',
        isCofO: true,
        isFenced: true,
        price: 35000
    }
]
//endpoint to create a property
app.post('/property', (request, response)=>{
    for(let key in request.body){
        request.body[key] = request.body[key].trim()
    }
    const {name, location, isCofO, isFenced, status} = request.body
    try {
        if(!name || !location || !isCofO || !isFenced){
            throw new Error (`All fields are required`)
        }
        for(let i = 0; i< realEstates.length; i++){
            if(realEstates[i].name == name && realEstates[i].location == location ){
                throw new Error (`This property already exist`)
            } 
        }

        realEstates.push({
            id: realEstates.length + 1,
            name,
            location,
            count: 10,
            status,
            isCofO,
            isFenced
        })
        response.status(201).json({
            message:'success',
            status: true,
            data: realEstates
        })
    } catch (error) {
         response.status(400).json({
            message: `${error.message}`,
            status: false,
        })
    }
})
//endpoint to update a property
app.patch('/property/:id', (request, response)=>{
    const {id} = request.params
    for(let key in request.body){
        request.body[key] = request.body[key].trim()
    }
    const {name, status, isCofO, isFenced, location} = request.body
    
    try {
        if(!name || !status || !isCofO || !isFenced || !location){
            throw new Error (`All fields are required`)
        }

        let property = realEstates.find( props => props.id == id)
        for(let i = 0; i< realEstates.length; i++){
            if(realEstates[i].name == name && realEstates[i].location == location ){
                throw new Error (`This property already exist`)
            } 
        }
        if(property){
            realEstates[id - 1] = {...property,  ...request.body}
        }else{
            throw new Error (`The property you're searching for is not available`)
        }
        response.status(200).json({
            message: 'Success',
            status: true,
            patched: property,
            data: realEstates
        })
    } catch (error) {
         response.status(400).json({
            message: `${error.message}`,
            status: false,
        })
    }
})

//endpoint to delete a property
app.delete('/property/:id', (request, response)=>{
    const {id} = request.params
    try {
        let deleteProp = realEstates.find((props)=> props.id == id)
        if(deleteProp){
            realEstates.splice(id-1, 1)
        }else{
            throw new Error `Property isn't available`
        }
        response.status(200).json({
            message: 'Successful',
            status: true,
            dataaa: realEstates
        })
    } catch (error) {
         response.status(400).json({
            message: `${error.message}`,
            status: false,
        })
    }
})
//endpoint to get all properties or by different query parameters
app.get('/properties', (request, response)=>{

    const {status, location, search} = request.query

    try {
        let properties = realEstates
        if(status){
            properties = realEstates.filter(props => props.status.toLowerCase() == status.toLowerCase())
        }
        if(location){
            properties = realEstates.filter(props => props.location.toLowerCase() == location.toLowerCase())
        }
        if(search){
           properties = []
            for(let i = 0; i< realEstates.length; i++){
                if(Object.values(realEstates[i]).join(' ').includes(search.toLowerCase())){
                    properties.push(realEstates[i])
                }
            }
        }
        if(properties.length == 0){
            properties = `There's no property with the above specification`
        }
        response.status(200).json({
            message: 'Successfull',
            status: true,
             data: properties
        })
    } catch (error) {
         response.status(400).json({
            message: `${error.message}`,
            status: false,
        })
    }


})
//endpoint to get a single property
app.get('/property/:id', (request, response)=>{
    const {id} = request.params
    try {
        const property = realEstates.find(props => props.id == id)
        if(!property){
            throw new Error (`Proper is not available`)
        }
        response.status(200).json({
            message: 'Successful',
            status: true,
            data: property
        })
    } catch (error) {
         response.status(400).json({
            message: `${error.message}`,
            status: false,
        })
    }
})
const users = [
    {
        id: 0,
        firstName: 'Abass',
        lastName: 'Ibrahim',
        email: 'abass@gmail.com',
        group: 'admin',
        username: null,
        password: 'zeekybass',
        status: 'active',
        isVerified: true,
        stateOfOrigin: null,
        dob: null,
        marital_status: null,
        gender: null,
        qualifications: null
    },
    {
        id: 1,
        firstName: 'Khawthar',
        lastName: 'Abass',
        email: 'khawthar@gmail.com',
        group: 'admin',
        username: null,
        password: 'ibr2024',
        status: 'active',
        isVerified: true,
        stateOfOrigin: null,
        dob: null,
        marital_status: null,
        gender: null,
        qualifications: null
    },
    {
        id: 2,
        firstName: 'Sherifat',
        lastName: 'Samiat',
        email: 'sherifat@gmail.com',
        group: 'user',
        username: null,
        password: 'Samoo4life',
        status: 'active',
        isVerified: true,
        stateOfOrigin: null,
        dob: null,
        marital_status: null,
        gender: null,
        qualifications: null
    }
]

//endpoint to create a new user
app.post('/user/register', (request, response)=>{
    for(let key in request.body){
        request.body[key] = request.body[key].trim()
    }
    const {firstName, lastName,email, password, isVerified} = request.body
    try {
        if(!firstName || !lastName || !password || !isVerified || !email){
            throw new Error (`All fields are required`)
        }
        for(let i = 0; i< users.length; i++){
            if(users[i].email == email){
                throw new Error (`Email already exists!! Login here`)
            }
        }
        if(firstName.length <3){
            throw new Error (`first name is too short`)
        }
        if(lastName.length <3){
            throw new Error (`last name is too short`)
        }
        if(password.length <3){
            throw new Error (`password is too short`)
        }
        users.push({
            id: users.length - 1,
            firstName,
            lastName,
            email,
            group: 'user',
            username: null,
            password,
            status: 'pending',
            isVerified,
            stateOfOrigin: null,
            dob: null,
            marital_status: null,
            gender: null,
            qualifications: null
        })
        response.status(200).json({
            message: 'Successful',
            status: true,
            data: users
        })
    } catch (error) {
         response.status(400).json({
            message: `${error.message}`,
            status: false,
        })
    }
})
//endpoint for user login
app.post('/user/login', (request, response)=>{
    const {email, password} = request.body
    try {
        if(!email || !password){
            throw new Error (`All fields are required!!`)
        }
        let user = users.find(user => user.email == email)
        if(!user){
            throw new Error (`This email does not exist!!`)
        }
        if(user.password != password){
            throw new Error (`password is not correct`)
        }
        response.status(200).json({
            message: 'successful',
            status: true,
            greetings: `You're welcome ${user.firstName}`,
            data: user
        })
    } catch (error) {
        response.status(400).json({
            message: `${error.message}`,
            status: false,
        })
    } 
})

let cart = []
//endpoint to add item to cart
app.post('/user/cart/add', (request, response)=>{
    const {id, quantity} = request.body
    try {
        if(!id || !quantity){
            throw new Error(`Please select an item`)
        }
        let item = realEstates.find(prop => prop.id == id) 
        if(!item){
            throw new Error(`This item is not available in store`)
        }
        if(item.count == 0 ){
            throw new Error (`This item is not available at the moment`)
        }else if(item.count < quantity){
            throw new Error (`The quantity you demanded is more than the quantites availble. You can only buy ${item.count} at the moment`)
        }
        for (let i =0; i < realEstates.length; i++){
            if(realEstates[i].id == id){
                realEstates[i].count -= parseInt(quantity)
                break 
            }
        }
        
        let addToCart = cart.find(cart => cart.id == id)
        if(!addToCart){
            cart.push({ 
                ...item,
                cartId: cart.length + 1,
                count: item.count,
                quantity,
                total: `$${item.price * quantity}`
                })
               
        }else{ 
            addToCart.count= item.count,
            addToCart.quantity+=quantity
            addToCart.total = `${(addToCart.price * parseInt(addToCart.quantity))}`
        }
        // parseInt(addToCart.total.slice(1)) + 
        response.status(200).json({
            message: 'Successful',
            status: true,
            data: cart,
        })
    } catch (error) {
        response.status(400).json({
            message: error.message,
            status: false
        })
    }
})

//endpoint to get all carts
app.get('/user/carts', (request, response)=>{
    try {
        const {location, search} = request.query
        let properties = cart

        if(location){
            properties = cart.filter(props => props.location.toLowerCase() == location.toLowerCase())
            if(properties.length == 0){
          throw new Error (`There's no property with the above specification in your cart`)
        }
        }
        if(search){
           properties = []
            for(let i = 0; i< cart.length; i++){
                if(Object.values(cart[i]).join(' ').includes(search.toLowerCase())){
                    properties.push(cart[i])
                }
            }
            if(properties.length == 0){
          throw new Error (`There's no property with the above specification in your cart`)
        }
        }
          
        response.status(200).json({
            message: 'Successfull',
            status: true,
             data: properties
        })
    }catch (error) {
         response.status(400).json({
            message: `${error.message}`,
            status: false,
        })
    }
})
//endpoint to get a single cart
app.get('/user/cart/:cartId', (request, response) =>{
    const {cartId} = request.params
    try {
        const cartItem = cart.find(props => props.cartId == cartId)
        if(!cartItem){
            throw new Error (`Item is not available in cart`)
        } 
        response.status(200).json({
            message: 'Successful',
            status: true,
            data: cartItem
        })
    } catch (error) {
         response.status(400).json({
            message: `${error.message}`,
            status: false,
        })
    }
})
//endpoint to update (add) to a cart
app.patch('/user/cart/:cartId', (request, response)=>{
    const {cartId} = request.params
    const {quantity} = request.body
    try {
    let property = cart.find(props => props.cartId == cartId)
    if(!property){
        throw new Error (`This property isn't available`)
    }
    property = {
        ...property,
        count: property.count -=quantity,
        quantity: property.quantity+=quantity,
        total: property.price *property.quantity
    }
    for(let i = 0; i < cart.length; i++){
        if(cart[i].cartId ==cartId){
            cart[i] = property
        }
    }
    response.status(200).json({
        message: 'SUccessful',
        status: true,
        data: property
    })
     } catch (error) {
        response.status(400).json({
            message: `${error.message}`,
            status: false,
        })
    }
})

//endpoint to delete a cart
app.delete('/user/cart/:cartId', (request, response)=>{
    const {cartId} = request.params
    try {
        for(let i = 0; i < cart.length; i++){
        if(cart[i].cartId ==cartId){
           cart.splice(i, 1)
        }
    }   
    response.status(200).json({
        message: "Successful",
        status: true,
        data: cart
    })
    } catch (error) {
        
    }
})