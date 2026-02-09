import './ProductList.css'

function ProductList({ products, totalPrice, onDelete, loading }) {
  return (
    <div className="product-list-section">
      <div className="list-header">
        <h2>Products</h2>
      </div>

      {loading ? (
        <div className="loading">Adding product...</div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <p>No products in cart. Use the search bar above to add one.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th style={{ width: '8%' }}>No.</th>
                <th style={{ width: '30%' }}>Product Name</th>
                <th style={{ width: '20%' }}>Brand</th>
                <th style={{ width: '20%' }}>Provider</th>
                <th style={{ width: '14%' }}>Unit Price</th>
                <th style={{ width: '8%' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.cartItemId}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>{product.provider}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => onDelete(product.cartItemId)}
                      title="Delete product from cart"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="table-footer">
            <div className="total-row">
              <span>TOTAL PRICE:</span>
              <span className="total-value">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductList
