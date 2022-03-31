const cartModel = require('../models/cart')

exports.addCart = (req, res) => {

    cartModel.findOne({ user: req.user._id }).
        exec((error, cart) => {
            if (error) return res.status(400).json({ error })
            if (cart) {
                const product = req.body.cartItems.product;
                const item = cart.cartItems.find(c => c.product == product)
                if(item){
                    cartModel.findOneAndUpdate({user:req.user._id,"cartItems.product":product},{
                        "$set":{
                            "cartItems.$":{
                                ...req.body.cartItems,
                                quantity: item.quantity + req.body.cartItems.quantity
                            }
                        }
                    }, { new: true }).exec((error,_cart) => {
                       if (error) return res.status(400).json({ error })
                       if (_cart) {
                           return res.status(201).json({ message: "Cart updated successfully!", result:_cart })
                       }
                    })
                }else{
                    cartModel.findOneAndUpdate({user:req.user._id},{
                        "$push":{
                            cartItems:req.body.cartItems
                        }
                    }, { new: true }).exec((error,_cart) => {
                       if (error) return res.status(400).json({ error })
                       if (_cart) {
                           return res.status(201).json({ message: "Cart updated successfully!", result: _cart })
                       }
                    })
                }                 
            } else {
                const cart = new cartModel({
                    user: req.user._id,
                    cartItems:[req.body.cartItems]
                })

                cart.save((error, cart) => {
                    if (error) return res.status(400).json({ error })
                    if (cart) {
                        return res.status(201).json({ message: "Cart add successfully!", result: cart })
                    }
                })

            }
        })

}

exports.getAll = (req, res) => {
    res.send('all cart')
}