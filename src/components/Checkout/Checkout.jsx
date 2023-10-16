// import React, { useState } from 'react'
import React, { useState, useEffect } from 'react';
import css from "./Checkout.module.css"
import axios from 'axios';

import Tick from "../../assets/Tick.svg";
import Hclose from '../../assets/close-hexagon.svg'
import { motion } from 'framer-motion';
import Barrow from "../../assets/backarrow.svg"
import { Link } from 'react-router-dom';
// import { cashfreeSandbox } from 'cashfree-dropjs';
import Cashfree from 'cashfree-dropjs';
// Use import { cashfreeProd } from 'cashfree-dropjs'; for production

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// const drop = new cashfree(options);

const clientId = ' TEST36894926ff0ed516529b3d6754949863';
const clientSecret = 'TEST5ef3f05321339e1bfa9d7d4747f28720a5da63db';

const Checkout = () => {
  // const notify = () => toast.error("Payment Unsuccessfull");

    const [opened,setOpened]=useState(false)
    const [sopened,setsOpened]=useState(false)
    const [inputValue, setInputValue] = useState(''); // Define inputValue state
    const [inputValueApply, setInputValueApply] = useState(''); // Define inputValue state
    const [couponCode, setCouponCode] = useState('');   //bckend
    const [userId, setUserId] = useState('');   //bckend
    const [totalAmount, setTotalAmount] = useState(14999); // Default total amount //bckend
    const [discount, setDiscount] = useState(0); // To store the discount amount  //bckend
    // const [influencerCode, setInfluencerCode] = useState('');  //bckend
    const [orderId, setOrderId] = useState('');               //bckend
    const [orderAmount, setOrderAmount] = useState(0);        //bckend
    const [paymentSessionId, setPaymentSessionId] = useState(''); // Store the payment session ID




    // const paymentSessionId = "your_payment_session_id"; // Replace with the actual payment_session_id

  

    useEffect(() => {
      // Fetch the payment session ID from your backend
      axios.post('/getpaymentsessionid', {
        userId: userId, // Replace with the actual user IDuserId,
        couponCode: couponCode, // Replace with the actual coupon codecouponCode
      })
        .then((response) => {
          setPaymentSessionId(response.data.paymentSessionId);
        })
        .catch((error) => {
          console.error('Failed to get payment session ID:', error);
        });
    }, []);
    



  useEffect(() => {
    // Include the Cashfree Drop SDK script based on your environment (sandbox or production)
    const script = document.createElement('script');
    script.src = 'https://sdk.cashfree.com/js/ui/2.0.0/cashfree.sandbox.js'; // Use the production URL for live transactions
    script.async = true;
    script.onload = () => {
      // Initialize Cashfree Drop
      const dropinConfig = {
        components: ["order-details", "card", "netbanking", "app", "upi"],
        onSuccess: function (data) {
           // Redirect the user to a "Thank You" page
           window.location.href = '/thankyou';
          // Handle success (e.g., display a success message)
          console.log('Payment succeeded:', data);
        },
        onFailure: function (data) {
          toast.error('Payment failed.');
          // Handle failure (e.g., display an error message)
          console.log('Payment failed:', data);
        },
        // style: {
        //   backgroundColor: "#ffffff",
        //   color: "#11385b",
        //   fontFamily: "Lato",
        //   fontSize: "14px",
        //   errorColor: "#ff0000",
        //   theme: "light",
        // },
      };

      // const cashfree = new Cashfree(paymentSessionId);
      // const cashfree = new cashfreeSandbox.Cashfree(); // Initialize Cashfree
      const cashfree = new Cashfree({ clientId, clientSecret });


      // Render the payment form
      cashfree.drop(document.getElementById("paymentForm"), {
        ...dropinConfig,
        paymentSessionId: paymentSessionId, // Pass the payment session ID
      });
      // dropinConfig);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [paymentSessionId]);

  // return (
  //   <div>
  //     <h2>Payment Form</h2>
  //     <div id="paymentForm"></div>
  //   </div>
  // );
// };




    // const currency = 'INR'; // Define currency with the appropriate value //bckend 

    const handleInputChange = (e) => {
      setInputValue(e.target.value); // Update inputValue when the input changes
    };
    // const handleInputChangeApply = (e) => {
    //   setInputValueApply(e.target.value); // Update inputValue when the input changes
    // };
  



    const handleApplyCoupon = async () => {
      try {
        const response = await axios.post('http://localhost:3000/validatecoupon', { couponCode });
        // const response = await axios.post('http://localhost:3000/validatecoupon', { couponCode }, { withCredentials: true })

        console.log(response.data); // debug
  
        if (response.data.success) {

          // Update the discount state with the discount amount
           setDiscount(response.data.discount);

            // Calculate the new total amount with the discount applied
            const newTotalAmount = totalAmount - response.data.discount;

            // Update the total amount state
            setTotalAmount(newTotalAmount);

          toast.success('Coupon applied successfully');
        } else {
          toast.error('Invalid coupon code');
        }
      } catch (error) {
        console.error('Error applying coupon code:', error.message);
        // toast.error('An error occurred while applying the coupon code');
      }
    };

    
  // //automatc validtn
  //   useEffect(() => {
  //     const couponInput = document.getElementById('coupon-input');
  
  //     couponInput.addEventListener('input', (e) => {
  //       const newCouponCode = e.target.value;
  //       setCouponCode(newCouponCode);
  //       handleApplyCoupon(newCouponCode);
  //     });
  
  //     return () => {
  //       couponInput.removeEventListener('input', () => {});
  //     };
  //   }, [totalAmount]);
  


      // Function to handle the payment process
    const handlePayment = async () => {
      try {
        const response = await axios.post('http://localhost:3000/createorder', {
          userId: 'user123', // Replace with the actual user ID   //CHANGES
          couponCode: couponCode ,                                               //related to payment backend
          // Include other user details here (name, email, phone)
        });
        setOrderId(response.data.order_id);
        setOrderAmount(response.data.order_amount);
  
        // Initialize Cashfree payment here using orderId and orderAmount
      } catch (error) {
        console.error('Failed to create order:', error);
      }
    // };
  
   

    
    
    return ( 

    <div className={css.container}>

       <div className={css.wrap}>

     <Link to ="/register">  <div className={css.wtop}>
        <img src={Barrow} alt="" />
          <span>Back</span> 
        </div> </Link> 
        
        
        <div className={css.wbottom}>

        <div className={css.left}>
          
          <div className={css.line}>
            <span>MEMBERSHIP</span>
            <span>BATCAVE OGs</span>
          </div>
          <div className={css.line}>
            <span>COST</span>
            <span>₹ 14,999</span>
          </div>

          <div className={css.checkoutform}>
          <div className={css.inputset}>
                  <input className={css.contactinp} type="text" required placeholder=" " />
                  <label className={css.label}>
                  <span className={css.char} style={{ transitionDelay: '00ms' }}>F</span>
        <span className={css.char} style={{ transitionDelay: '50ms' }}>U</span> 
        <span className={css.char} style={{ transitionDelay: '100ms' }}>L</span>
        <span  className={css.char}style={{ transitionDelay: '150ms' }}>L</span>
        <span  className={css.char}style={{ transitionDelay: '150ms' }}></span>
        <span className={css.char} style={{ transitionDelay: '200ms' }}>N</span>
        <span className={css.char} style={{ transitionDelay: '250ms' }}>A</span>
        <span className={css.char} style={{ transitionDelay: '300ms' }}>M</span>
        <span className={css.char} style={{ transitionDelay: '350ms' }}>E</span>
      
    </label>
                  {/* <div className={css.inputline}></div> */}
        </div>
          <div className={`${css.inputset} ${inputValue ? css.hasContent : ""}`}>
                  <input className={css.contactinp} 
                   name="number"
                   value={inputValue} 
                   onChange={handleInputChange}
                  type="text" required placeholder=" " 
                  pattern="[1-9]{1}[0-9]{9}"  maxLength="10"/>
                  <label className={css.label}>
        <span className={css.char} style={{ transitionDelay: '00ms' }}>M</span>
        <span className={css.char} style={{ transitionDelay: '50ms' }}>O</span> 
        <span className={css.char} style={{ transitionDelay: '100ms' }}>B</span>
        <span  className={css.char}style={{ transitionDelay: '150ms' }}>I</span>
        <span className={css.char} style={{ transitionDelay: '200ms' }}>L</span>
        <span className={css.char} style={{ transitionDelay: '250ms' }}>E</span>
        <span className={css.char} style={{ transitionDelay: '300ms' }}></span>
        <span className={css.char} style={{ transitionDelay: '350ms' }}>N</span>
        <span className={css.char} style={{ transitionDelay: '400ms' }}>U</span>
        <span className={css.char} style={{ transitionDelay: '450ms' }}>M</span> 
        <span className={css.char} style={{ transitionDelay: '500ms' }}>B</span>
        <span className={css.char} style={{ transitionDelay: '550ms' }}>E</span>
        <span className={css.char} style={{ transitionDelay: '600ms' }}>R</span>
      
    </label>
                  {/* <div className={css.inputline}></div> */}
        </div>
          <div className={css.inputset}>
                  <input className={css.contactinp} type="text" required placeholder="" />
                  <label className={css.label}>
        <span className={css.char} style={{ transitionDelay: '00ms' }}>S</span>
        <span className={css.char} style={{ transitionDelay: '50ms' }}>H</span> 
        <span className={css.char} style={{ transitionDelay: '100ms' }}>I</span>
        <span  className={css.char}style={{ transitionDelay: '150ms' }}>P</span>
        <span className={css.char} style={{ transitionDelay: '200ms' }}>P</span>
        <span className={css.char} style={{ transitionDelay: '250ms' }}>I</span>
        <span className={css.char} style={{ transitionDelay: '300ms' }}>N</span>
        <span className={css.char} style={{ transitionDelay: '350ms' }}>G</span>
        <span className={css.char} style={{ transitionDelay: '400ms' }}></span>
        <span className={css.char} style={{ transitionDelay: '600ms' }}>A</span>
        <span className={css.char} style={{ transitionDelay: '650ms' }}>D</span>
        <span className={css.char} style={{ transitionDelay: '700ms' }}>D</span>
        <span className={css.char} style={{ transitionDelay: '750ms' }}>R</span>
        <span className={css.char} style={{ transitionDelay: '800ms' }}>E</span>
        <span className={css.char} style={{ transitionDelay: '850ms' }}>S</span>
        <span className={css.char} style={{ transitionDelay: '900ms' }}>S</span>
      
    </label>
                  {/* <div className={css.inputline}></div> */}
               <div className={css.checkboxdiv}> <input className={css.check} type="checkbox"  />
                  <p className={css.shippinglabel} htmlFor="">My shipping address same as my residential address</p>
                  </div>  

  <div className={css.inputset}>
                  <div className={css.applydiv}>
                    <input className={css.contactinp}   id="coupon-input" type="text" placeholder="" required
                    // value={
                      // inputValueApply}
                    // onChange={(e) =>
                    //  handleInputChangeApply(e)}
                    //  />

                    value={couponCode}
                    
            onChange={(e) => setCouponCode(e.target.value)}
            // onKeyUp={(e) => {
            //   if (e.key === 'Enter') {
            //     handleApplyCoupon();
            //   }
            // }}
          />
            {/* /> */}
                   
                              <label className={css.label}>
                              {/* <span className={`${css.char} ${inputValue ? css.showImage : ''}`} style={{ transitionDelay: '00ms' }}>Abbb</span> */}

        <span className={css.char} style={{ transitionDelay: '00ms' }}>A</span>
        <span className={css.char} style={{ transitionDelay: '50ms' }}>P</span> 
        <span className={css.char} style={{ transitionDelay: '100ms' }}>P</span>
        <span  className={css.char}style={{ transitionDelay: '150ms' }}>L</span>
        <span className={css.char} style={{ transitionDelay: '200ms' }}>Y</span>
        <span className={css.char} style={{ transitionDelay: '250ms' }}></span>
        <span className={css.char} style={{ transitionDelay: '300ms' }}>C</span>
        <span className={css.char} style={{ transitionDelay: '350ms' }}>O</span>
        <span className={css.char} style={{ transitionDelay: '400ms' }}>U</span>
        <span className={css.char} style={{ transitionDelay: '600ms' }}>P</span>
        <span className={css.char} style={{ transitionDelay: '650ms' }}>O</span>
        <span className={css.char} style={{ transitionDelay: '700ms' }}>N</span>
      
    </label>
    {/* <img className={`${css.tickImage} ${inputValueApply ? css.showImage : css.hideImage}`} src={Tick} alt="" /> */}
    <img className={`${css.tickImage} ${couponCode ? css.showImage : css.hideImage}`} src={Tick} alt=""   onClick={handleApplyCoupon} // Add this line
 />         
                  </div>
        
                

                  </div>
        </div>


          </div>

        </div>



        <div className={css.right}>

            <span className={css.checkoutspan}>Checkout summary</span>

            <div className={css.line}>
                <span>membership cost</span>
                <span>₹ 14,999</span>
            </div>
            

            <div className={css.line}>
                <span>coupon</span>
                {/* <span>₹ 14,999</span> */}
                {/* <span>₹ {discount > 0 ? (14999 - discount) : 0} </span> */}
                <span>₹ {discount || 0} </span>

            </div>
            <div className={css.plainline}></div>


            <div className={css.gtotal}>
                <span>grand total</span>
                {/* <span>₹ 13,001</span> */}
                <span>₹ {discount > 0 ? (14999 - discount) : 14999} </span>
            </div>

            <span className={css.agreespan}>by clicking, I AGREE WITH THE <span onClick={()=>setOpened(!opened)} className={css.spaninside}>refund policy </span> &  <span onClick={()=>setsOpened(!opened)} className={css.spaninside}>shipping policy </span></span>

            {/* <button onClick={notify} className={css.proceedbtn}>PROCEED TO PAY</button> */}
            <button onClick={handlePayment} className={css.proceedbtn}>PROCEED TO PAY</button>






        </div>
        </div>

       </div>
       {/* <button onClick={notify}>button</button> */}
       <ToastContainer  position={"bottom-center"} />

       {/* refund policy popup */}
     {opened && <motion.div 
     initial={{x:130}}
     whileInView={{ x:0}}
     transition={{duration:0.8}}
     className={css.refund} >
        <div className={css.head}>
            <span>Refund policy</span>
            <img onClick={()=>setOpened(false)} src={Hclose} alt="" />
        </div>

        <div className={css.content}>
            <span className={css.rhead}>Effective Date: 10-10-2023</span> 
            <span className={css.rhead}>Membership Refunds:</span>

            <span className={css.rcontent}>At Batcave OGs, we value your membership and your commitment to our community of car enthusiasts. However, please note that all membership fees are non-refundable. We do not offer refunds for membership payments under any circumstances.</span>
        
         <span className={css.rhead}>Event Registration Refunds:</span>
         <span className={css.rcontent}>For events and activities organised by Batcave OGs, event registration fees may be eligible for refunds, subject to the following conditions:</span>
        

        <span className={css.rcontent1}>- Full Refund: Cancellations made 3 days or more before the event start date.</span>
        <span className={css.rcontent1}>- Partial Refund: Cancellations made within 3 days before the event start date, subject to a 40% cancellation fee.</span>
        <span className={css.rcontent1}>- No Refund: Cancellations made on or after the event start date.</span>


        <span className={css.rhead}>Refund Process:</span>

        <span className={css.rcontent}>To request a refund for an event or activity, please contact us at refunds@batcave.co.in. Refunds will be processed within 5-7 business days, and the amount refunded will be based on the above refund policy conditions.</span>
       
       <span className={css.rhead}>Contact Us:</span>
       <span className={css.rcontent}>If you have any questions or concerns about our refund policy, please contact us at <a href="mailto: support@batcave.co.in.">support@batcave.co.in.</a> </span>
        </div>





       </motion.div> }



       {/* shipping policy */}

       {sopened && <motion.div 
     initial={{x:130}}
     whileInView={{ x:0}}
     transition={{duration:0.8}}
     className={css.shipping} >
        <div className={css.head}>
            <span>Shipping policy</span>
            <img onClick={()=>setsOpened(false)} src={Hclose} alt="" />
        </div>

        <div className={css.content}>
       <span className={css.shead}> Effective Date: 10-10-2023 </span> 

<span className={css.shead}>  1. Shipping Information:  </span>

<span className={css.scontent}>Batcave OGs ("Club") offers shipping services for specific products, merchandise, or promotional items. Shipping may be available to locations within [list the specific regions or countries where you offer shipping]. </span>

<span className={css.shead}> 2. Shipping Methods: </span>


<span className={css.scontent1}> We offer the following shipping methods:  </span>
 <span className={css.scontent1}> - Standard Shipping: Estimated delivery time 7-14 Business Days.</span>
 <span className={css.scontent1}> - Express Shipping: Estimated delivery time 4-7 Business Days.</span>

 <span className={css.shead}>3. Order Processing:</span>

<span className={css.scontent1}> - Orders are typically processed and shipped within 7-10 business days.</span>
 <span className={css.scontent1}> - You will receive a confirmation email with tracking information once your order has shipped.</span>

 <span className={css.shead}>4. Shipping Costs:</span>

 <span className={css.scontent1}> Shipping costs are calculated based on the weight, dimensions, and destination of your order. The exact shipping cost will be displayed during the checkout process.</span>

 <span className={css.shead}>5. Delivery Times:</span>

<span className={css.scontent1}> Delivery times may vary depending on the shipping method selected and the destination. Estimated delivery times are provided for each shipping method, but please note that these are approximate and not guaranteed. </span>

 <span className={css.shead}>6. International Shipping:</span>
 <span className={css.scontent1}>For international orders, please be aware of any import duties, taxes, or customs fees that may be applicable in your country. These fees are the responsibility of the recipient. </span>


 <span className={css.shead}>7. Lost or Damaged Shipments:</span>
 <span className={css.scontent1}> In the event of a lost or damaged shipment, please contact us at support@batcave.co.in as soon as possible. We will work with the shipping carrier to resolve the issue. </span>


 <span className={css.shead}>8. Tracking Orders:</span>
 <span className={css.scontent1}>You can track the status of your order by using the tracking information provided in your order confirmation email. </span>


 <span className={css.shead}>9. Contact Us:</span>
 <span className={css.scontent1}> If you have any questions or concerns about our shipping policy, please contact us at support@batcave.co.in.  </span>
 
        </div>





       </motion.div> }
      
    </div>
  )
}
}

export default Checkout
 