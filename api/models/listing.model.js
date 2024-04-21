import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
      },
    city: {
      type: String,  
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    type: {
        type: String,
        required: true,
      },
    CarNumber: {
        type: String,
        required: true,
      }, 
      offer: {
        type: Boolean,
        required: true,
      },  
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
    DriverName:{
      type:String,
      
    },
    experience:{
      type:Number,
     
    },
    available:{
      type: Boolean,
      required: true,
    }
  },
  { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
