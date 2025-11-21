import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Wallet, Bitcoin, Loader2, ArrowLeft, Lock, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";

interface PaymentMethod {
    id: string;
    name: string;
    type: 'credit_card' | 'paypal' | 'crypto';
    icon: string;
    enabled: boolean;
}

interface OrderDetails {
    order_id: string;
    order_no: string;
    status: string;
    total: number;
    email: string;
    items: any[];
    created_at: string;
}

const COUNTRIES = [
    "United States", "United Kingdom", "Canada", "Australia", "Germany", "France",
    "Japan", "China", "India", "Brazil", "Italy", "Spain", "Netherlands",
    "Sweden", "Switzerland", "Singapore", "South Korea", "Mexico"
];

export default function Payment() {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [selectedMethod, setSelectedMethod] = useState<string>("");
    const [country, setCountry] = useState("United States");
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCvc, setCardCvc] = useState("");
    const [cardName, setCardName] = useState("");

    // Validation states
    const [cardNumberError, setCardNumberError] = useState("");
    const [expiryError, setExpiryError] = useState("");
    const [cvcError, setCvcError] = useState("");

    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

    useEffect(() => {
        if (orderId) {
            fetchOrderDetails(orderId);
        }
        fetchPaymentMethods();
        detectCountry();
    }, [orderId]);

    const fetchOrderDetails = async (id: string) => {
        try {
            const response = await fetch(`https://api.shopindream.shop/public/api/cart/order.php?order_id=${id}`);
            const data = await response.json();

            if (data.code === 200 && data.data) {
                setOrderDetails(data.data);
            } else {
                console.warn("Failed to fetch order details, using mock data");
                setOrderDetails({
                    order_id: id,
                    order_no: id,
                    status: "pending",
                    total: 129.99,
                    email: "user@example.com",
                    items: [],
                    created_at: new Date().toISOString()
                });
            }
        } catch (error) {
            console.error("Error fetching order:", error);
            setOrderDetails({
                order_id: id,
                order_no: id,
                status: "pending",
                total: 129.99,
                email: "user@example.com",
                items: [],
                created_at: new Date().toISOString()
            });
        }
    };

    const detectCountry = async () => {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            if (data.country_name && COUNTRIES.includes(data.country_name)) {
                setCountry(data.country_name);
            } else if (data.country_name) {
                setCountry(data.country_name);
            }
        } catch (error) {
            console.error("Failed to detect country", error);
        }
    };

    const fetchPaymentMethods = async () => {
        setLoading(true);
        try {
            try {
                const response = await fetch("https://api.shopindream.shop/public/api/payment/methods.php");
                const data = await response.json();
                if (data.code === 200 && data.data) {
                    setPaymentMethods(data.data);
                    if (data.data.length > 0) {
                        setSelectedMethod(data.data[0].id);
                    }
                    return;
                }
            } catch (e) {
                console.warn("Backend payment methods not available, using mock");
            }

            const mockMethods: PaymentMethod[] = [
                { id: "stripe", name: "Card", type: "credit_card", icon: "card", enabled: true },
                { id: "paypal", name: "PayPal", type: "paypal", icon: "paypal", enabled: true },
                { id: "crypto", name: "Crypto", type: "crypto", icon: "bitcoin", enabled: true },
            ];

            setPaymentMethods(mockMethods);
            if (mockMethods.length > 0) {
                setSelectedMethod(mockMethods[0].id);
            }
        } catch (error) {
            console.error("Failed to fetch payment methods", error);
            toast.error("Failed to load payment options");
        } finally {
            setLoading(false);
        }
    };

    // Luhn Algorithm for card number validation
    const validateCardNumber = (number: string): boolean => {
        const digits = number.replace(/\s/g, '');
        if (!/^\d+$/.test(digits) || digits.length < 13 || digits.length > 19) {
            return false;
        }

        let sum = 0;
        let isEven = false;

        for (let i = digits.length - 1; i >= 0; i--) {
            let digit = parseInt(digits[i]);

            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
            isEven = !isEven;
        }

        return sum % 10 === 0;
    };

    // Validate expiry date
    const validateExpiry = (expiry: string): boolean => {
        if (!expiry || expiry.length !== 5) return false;

        const [month, year] = expiry.split('/');
        const monthNum = parseInt(month);
        const yearNum = parseInt('20' + year);

        if (monthNum < 1 || monthNum > 12) return false;

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;

        if (yearNum < currentYear) return false;
        if (yearNum === currentYear && monthNum < currentMonth) return false;

        return true;
    };

    // Validate CVC
    const validateCvc = (cvc: string, cardNum: string): boolean => {
        // American Express uses 4 digits, others use 3
        const isAmex = cardNum.replace(/\s/g, '').startsWith('34') || cardNum.replace(/\s/g, '').startsWith('37');
        const expectedLength = isAmex ? 4 : 3;

        return cvc.length === expectedLength && /^\d+$/.test(cvc);
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\s/g, '');
        value = value.replace(/\D/g, '');

        // Format with spaces every 4 digits
        const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
        setCardNumber(formatted);

        // Validate on blur or when complete
        if (value.length >= 13) {
            if (!validateCardNumber(value)) {
                setCardNumberError("卡号无效");
            } else {
                setCardNumberError("");
            }
        } else if (value.length > 0) {
            setCardNumberError("");
        }
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) value = value.slice(0, 4);

        if (value.length >= 2) {
            value = `${value.slice(0, 2)}/${value.slice(2)}`;
        }
        setCardExpiry(value);

        // Validate expiry
        if (value.length === 5) {
            if (!validateExpiry(value)) {
                setExpiryError("有效期无效或已过期");
            } else {
                setExpiryError("");
            }
        } else if (value.length > 0) {
            setExpiryError("");
        }
    };

    const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        const maxLength = 4;
        const truncated = value.slice(0, maxLength);
        setCardCvc(truncated);

        // Validate CVC
        if (truncated.length >= 3) {
            if (!validateCvc(truncated, cardNumber)) {
                setCvcError("CVV 长度不正确");
            } else {
                setCvcError("");
            }
        } else if (truncated.length > 0) {
            setCvcError("");
        }
    };

    const handlePayment = async () => {
        if (!selectedMethod) {
            toast.error("Please select a payment method");
            return;
        }

        // Validate card details for stripe
        if (selectedMethod === 'stripe') {
            const cardNumClean = cardNumber.replace(/\s/g, '');

            if (!validateCardNumber(cardNumClean)) {
                setCardNumberError("卡号无效");
                toast.error("请检查卡号");
                return;
            }

            if (!validateExpiry(cardExpiry)) {
                setExpiryError("有效期无效或已过期");
                toast.error("请检查有效期");
                return;
            }

            if (!validateCvc(cardCvc, cardNumber)) {
                setCvcError("CVV 长度不正确");
                toast.error("请检查 CVV");
                return;
            }

            if (!cardName.trim()) {
                toast.error("请输入持卡人姓名");
                return;
            }
        }

        setProcessing(true);

        try {
            const paymentData = {
                order_id: orderId,
                payment_method: selectedMethod,
                payment_details: {
                    country: country,
                    ...(selectedMethod === 'stripe' && {
                        card_number: cardNumber.replace(/\s/g, ''),
                        card_expiry: cardExpiry,
                        card_cvc: cardCvc,
                        card_holder: cardName
                    })
                }
            };

            const response = await fetch("https://api.shopindream.shop/public/api/payment/process.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(paymentData),
            });

            const result = await response.json();

            if (result.code === 200) {
                toast.success("Payment successful!", {
                    description: "Thank you for your purchase.",
                });
                navigate(`/order-confirmation?order_id=${orderId}`);
            } else {
                throw new Error(result.message || "Payment failed");
            }

        } catch (error: any) {
            console.error("Payment processing error:", error);
            toast.error(error.message || "Payment failed. Please try again.");
        } finally {
            setProcessing(false);
        }
    };

    const displayAmount = orderDetails ? orderDetails.total : 0;
    const displayEmail = orderDetails ? orderDetails.email : "Loading...";

    return (
        <div className="min-h-screen bg-background flex flex-col lg:flex-row">
            <SEO title="Payment - ShopHub" description="Secure payment page" />

            {/* Left Panel - Order Summary */}
            <div className="lg:w-1/2 bg-muted/30 p-6 lg:p-12 order-1 lg:order-1 border-r border-border/50">
                <div className="max-w-lg mx-auto h-full flex flex-col">
                    <div className="mb-8">
                        <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary" onClick={() => navigate('/')}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to store
                        </Button>
                        <div className="mt-6 flex items-center gap-3 text-muted-foreground">
                            <span className="font-medium text-foreground">Pay ShopHub Inc.</span>
                            <span className="text-xs bg-muted px-2 py-0.5 rounded">TEST MODE</span>
                        </div>
                        <div className="mt-2">
                            <span className="text-4xl font-bold tracking-tight">${displayAmount.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Order number</span>
                                <span className="font-medium">{orderDetails?.order_no || orderId}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Customer</span>
                                <span className="font-medium">{displayEmail}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto pt-8 text-xs text-muted-foreground flex gap-4">
                        <span>Powered by <span className="font-bold text-foreground">Stripe</span></span>
                        <span>Terms</span>
                        <span>Privacy</span>
                    </div>
                </div>
            </div>

            {/* Right Panel - Payment Form */}
            <div className="lg:w-1/2 p-6 lg:p-12 order-2 lg:order-2 bg-background">
                <div className="max-w-lg mx-auto">
                    <h2 className="text-xl font-semibold mb-6">Payment Details</h2>

                    {/* Payment Method Tabs */}
                    <div className="mb-8">
                        <Label className="text-sm text-muted-foreground mb-3 block">Select payment method</Label>
                        <div className="grid grid-cols-3 gap-3">
                            {paymentMethods.map((method) => (
                                <div
                                    key={method.id}
                                    onClick={() => setSelectedMethod(method.id)}
                                    className={`
                    cursor-pointer rounded-lg border p-4 flex flex-col items-center justify-center gap-2 transition-all
                    ${selectedMethod === method.id
                                            ? 'border-primary bg-primary/5 ring-1 ring-primary text-primary'
                                            : 'border-border hover:border-primary/50 hover:bg-secondary/50'}
                  `}
                                >
                                    {method.type === 'credit_card' && <CreditCard className="w-6 h-6" />}
                                    {method.type === 'paypal' && <Wallet className="w-6 h-6" />}
                                    {method.type === 'crypto' && <Bitcoin className="w-6 h-6" />}
                                    <span className="text-xs font-medium">{method.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment Form Content */}
                    <div className="space-y-6">
                        {selectedMethod === 'stripe' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="space-y-2">
                                    <Label>Card Information</Label>
                                    <div className={`border rounded-lg overflow-hidden transition-all ${cardNumberError || expiryError || cvcError
                                            ? 'border-destructive focus-within:ring-destructive'
                                            : 'focus-within:ring-1 focus-within:ring-primary focus-within:border-primary'
                                        }`}>
                                        <div className="relative">
                                            <CreditCard className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                                            <Input
                                                className="border-0 rounded-none h-12 pl-10 focus-visible:ring-0"
                                                placeholder="1234 5678 9012 3456"
                                                value={cardNumber}
                                                onChange={handleCardNumberChange}
                                                maxLength={19}
                                            />
                                            {cardNumberError && (
                                                <AlertCircle className="absolute right-3 top-3 w-5 h-5 text-destructive" />
                                            )}
                                            {!cardNumberError && cardNumber.replace(/\s/g, '').length >= 13 && validateCardNumber(cardNumber.replace(/\s/g, '')) && (
                                                <CheckCircle2 className="absolute right-3 top-3 w-5 h-5 text-green-500" />
                                            )}
                                        </div>
                                        <Separator />
                                        <div className="flex">
                                            <div className="relative flex-1 border-r">
                                                <Input
                                                    className="border-0 rounded-none h-12 focus-visible:ring-0"
                                                    placeholder="MM / YY"
                                                    value={cardExpiry}
                                                    onChange={handleExpiryChange}
                                                    maxLength={5}
                                                />
                                                {expiryError && (
                                                    <AlertCircle className="absolute right-3 top-3 w-5 h-5 text-destructive" />
                                                )}
                                                {!expiryError && cardExpiry.length === 5 && validateExpiry(cardExpiry) && (
                                                    <CheckCircle2 className="absolute right-3 top-3 w-5 h-5 text-green-500" />
                                                )}
                                            </div>
                                            <div className="relative flex-1">
                                                <Input
                                                    className="border-0 rounded-none h-12 focus-visible:ring-0"
                                                    placeholder="CVC"
                                                    value={cardCvc}
                                                    onChange={handleCvcChange}
                                                    maxLength={4}
                                                />
                                                {cvcError && (
                                                    <AlertCircle className="absolute right-3 top-3 w-5 h-5 text-destructive" />
                                                )}
                                                {!cvcError && cardCvc.length >= 3 && validateCvc(cardCvc, cardNumber) && (
                                                    <CheckCircle2 className="absolute right-3 top-3 w-5 h-5 text-green-500" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {(cardNumberError || expiryError || cvcError) && (
                                        <p className="text-sm text-destructive flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {cardNumberError || expiryError || cvcError}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label>Cardholder Name</Label>
                                    <Input
                                        className="h-11"
                                        placeholder="Full name on card"
                                        value={cardName}
                                        onChange={(e) => setCardName(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Country or region</Label>
                                    <Select value={country} onValueChange={setCountry}>
                                        <SelectTrigger className="h-11">
                                            <SelectValue placeholder="Select country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {COUNTRIES.map((c) => (
                                                <SelectItem key={c} value={c}>{c}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}

                        {selectedMethod === 'paypal' && (
                            <div className="p-6 border rounded-lg bg-blue-50/50 text-center animate-in fade-in slide-in-from-top-2 duration-300">
                                <Wallet className="w-12 h-12 mx-auto text-blue-500 mb-3" />
                                <p className="text-sm text-muted-foreground mb-4">
                                    Click the button below to be redirected to PayPal to complete your secure payment.
                                </p>
                            </div>
                        )}

                        {selectedMethod === 'crypto' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="p-4 border rounded-lg bg-secondary/20">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-2">
                                            <Bitcoin className="w-5 h-5 text-orange-500" />
                                            <span className="font-medium">Bitcoin</span>
                                        </div>
                                        <span className="text-xs font-mono bg-background px-2 py-1 rounded border">BTC</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Input readOnly value="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" className="font-mono text-xs h-9" />
                                        <Button size="sm" variant="outline" onClick={() => toast.success("Copied!")}>Copy</Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <Button
                            className="w-full h-12 text-base font-semibold mt-8"
                            size="lg"
                            onClick={handlePayment}
                            disabled={processing || loading}
                        >
                            {processing ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <div className="flex items-center justify-center gap-2">
                                    {selectedMethod === 'paypal' ? 'Pay with PayPal' : `Pay $${displayAmount.toFixed(2)}`}
                                    {!['paypal'].includes(selectedMethod) && <Lock className="w-4 h-4 opacity-70" />}
                                </div>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
