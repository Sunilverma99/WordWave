

function CreditCard() {
    const [cardDetails, setCardDetails] = useState({
        number: '',
        name: '',
        expiry: '',
        cvc: '',
        focused: '',
      });
      const handleInputChange = (e) => {
        setCardDetails({
          ...cardDetails,
          [e.target.name]: e.target.value,
        });
      };
      const handleFocusChange = (e) => {
        setCardDetails({
          ...cardDetails,
          focused: e.target.name,
        });
      };
  return (
  
  )
}

export default CreditCard