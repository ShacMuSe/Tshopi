import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import DefaultImage from "../../assets/default-product.png";
import "../OrderPage/OrderPage.css";

import type { Product } from "../../types/Product";
import { getProducts } from "../../services/productService";
import { StockStatus } from "../enums/StockStatus";
import { addToCart } from "../../services/cartService";
import { createOrder } from "../../services/orderService";


type MediaItem = { url: string; type: "image" | "video" };

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    let mounted = true;

    const loadProduct = async () => {
      setLoading(true);
      try {
        const res = await getProducts();
        const found = res.data.find((p) => p.id === Number(id)) ?? null;

        if (!mounted) return;

        setProduct(found);

        const firstImage = found?.imageUrls?.[0];
        const firstVideo = found?.videoUrls?.[0];

        if (firstImage) setSelectedMedia({ url: firstImage, type: "image" });
        else if (firstVideo) setSelectedMedia({ url: firstVideo, type: "video" });
        else setSelectedMedia({ url: "", type: "image" });
      } catch (err) {
        console.error(err);
        if (mounted) setProduct(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadProduct();
    return () => {
      mounted = false;
    };
  }, [id]);

  const allMedia: MediaItem[] = useMemo(() => {
    if (!product) return [];
    return [
      ...(product.imageUrls ?? []).map((url) => ({ url, type: "image" as const })),
      ...(product.videoUrls ?? []).map((url) => ({ url, type: "video" as const })),
    ];
  }, [product]);

  const handleOrderNow = async () => {
    if (!product?.id) return;

    try {
      setSubmitting(true);

      await createOrder({
        productId: product.id,
        firstName,
        lastName,
        phone,
        email,
        address,
        quantity,
        selectedImage: selectedMedia?.url || "",
      });

      navigate("/"); // or success page
    } catch (e) {
      alert("Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product?.id) return;

    const phoneValue = phone || prompt("Enter your phone number");
    if (!phoneValue) return;

    await addToCart({
      phone: phoneValue,
      productId: product.id,
      quantity,
    });

    alert("Added to cart");
  };




  if (loading) {
    return (
      <div className="op-page">
        <div className="op-shell">
          <div className="op-loading">
            <div className="op-spinner" />
            <p>Loading product…</p>
          </div>
        </div>
      </div>
    );
  }


  if (!product) {
    return (
      <div className="op-page">
        <div className="op-shell">
          <div className="op-success">
            <div className="op-successIcon">❌</div>
            <h2>Product not found</h2>
            <p>This product may have been removed or the link is incorrect.</p>

            <div className="op-successActions">
              <Link to="/listproducts" className="op-btn op-btnPrimary">
                Back to Products
              </Link>
              <Link to="/" className="op-btn op-btnGhost">
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }


  const isOutOfStock = product.stockStatus === StockStatus.OUT_OF_STOCK;
  const isInStock = product.stockStatus === StockStatus.IN_STOCK;
  const badgeText = isInStock ? "In Stock" : "Out of Stock";

  const mainIsVideo = selectedMedia?.type === "video";
  const mainUrl = selectedMedia?.url;

  return (
    <div className="op-page">
      <div className="op-shell">
        <div className="op-card">

          {/* Header */}
          <div className="op-header">
            <div>
              <h1 className="op-title">{product.name}</h1>
              <p className="op-sub">
                <span className="op-price">${product.price.toFixed(2)}</span>
                <span className="op-dot">•</span>
                <span className="op-muted">Secure checkout</span>
              </p>
            </div>

            <Link to="/listproducts" className="op-back">← Back</Link>
          </div>



          <div className="op-grid">

            {/* LEFT */}
            <div className="op-media">
              <div className="op-imageWrap">
                <img
                  src={selectedMedia?.url || DefaultImage}
                  className="op-productImage"
                />
              </div>

              <div className="op-thumbs">
                {allMedia.map((m, i) => (
                  <button
                    key={i}
                    className={`op-thumbBtn ${selectedMedia?.url === m.url ? "active" : ""}`}
                    onClick={() => setSelectedMedia(m)}
                  >
                    <img src={m.url} />
                  </button>
                ))}
              </div>

              <div className="op-summary">
                <div className="op-summaryRow">
                  <span>Quantity</span>
                  <span>{quantity}</span>
                </div>
                <div className="op-summaryRow">
                  <span>Total</span>
                  <span>${(product.price * quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="op-form">

              <div className="op-fieldRow">
                <label className="op-label">
                  First name
                  <input
                    className="op-input"
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </label>

                <label className="op-label">
                  Last name
                  <input
                    className="op-input"
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </label>
              </div>

              <label className="op-label">
                Phone number
                <input
                  className="op-input"
                  type="tel"
                  placeholder="+216 …"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </label>

              <label className="op-label">
                Email address
                <input
                  className="op-input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

              <label className="op-label">
                Delivery address
                <textarea
                  className="op-input op-textarea"
                  placeholder="Street, city, zip…"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </label>


              <label className="op-label">
                Quantity
                <div className="op-qty">
                  <button
                    type="button"
                    className="op-qtyBtn"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>

                  <input
                    className="op-qtyInput"
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, Number(e.target.value || 1)))
                    }
                  />

                  <button
                    type="button"
                    className="op-qtyBtn"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </label>

              {/* ACTIONS */}
              <button
                className="op-btn op-btnPrimary op-submit"
                onClick={handleOrderNow}
                disabled={submitting}
              >
                {submitting ? "Placing order…" : "Confirm Order"}
              </button>
              <p className="op-footnote">
                By confirming, you agree to be contacted about your order.
              </p>


              <button
                type="button"
                className="op-btn op-btnGhost"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>

  );
};

export default ProductDetailsPage;
