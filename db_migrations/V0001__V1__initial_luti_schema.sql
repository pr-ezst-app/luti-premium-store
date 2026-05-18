CREATE TABLE IF NOT EXISTS t_p96355905_luti_premium_store.categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p96355905_luti_premium_store.products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category_id INTEGER REFERENCES t_p96355905_luti_premium_store.categories(id),
  price INTEGER NOT NULL,
  tag VARCHAR(50) DEFAULT '',
  img_url TEXT DEFAULT '',
  description TEXT DEFAULT '',
  stock INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p96355905_luti_premium_store.clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(50),
  company VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p96355905_luti_premium_store.orders (
  id SERIAL PRIMARY KEY,
  order_ref VARCHAR(20) NOT NULL UNIQUE,
  client_id INTEGER REFERENCES t_p96355905_luti_premium_store.clients(id),
  status VARCHAR(50) DEFAULT 'Pendiente',
  total INTEGER NOT NULL DEFAULT 0,
  notes TEXT DEFAULT '',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p96355905_luti_premium_store.order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES t_p96355905_luti_premium_store.orders(id),
  product_id INTEGER REFERENCES t_p96355905_luti_premium_store.products(id),
  product_name VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS t_p96355905_luti_premium_store.contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  service_type VARCHAR(100),
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO t_p96355905_luti_premium_store.categories (name) VALUES
  ('Hoodies'),
  ('Camisetas'),
  ('Pantalones'),
  ('Accesorios');

INSERT INTO t_p96355905_luti_premium_store.products (name, category_id, price, tag, description, stock) VALUES
  ('Hoodie Oversize Negro', 1, 89900, 'NEW', 'Hoodie oversize en algodón premium 320g', 25),
  ('Tee Premium Vintage', 2, 49900, 'BEST', 'Camiseta vintage lavada 180g', 40),
  ('Sudadera Crewneck', 1, 74900, '', 'Sudadera cuello redondo 300g', 15),
  ('Polo Urbano', 2, 59900, '', 'Polo piqué urbano con bordado', 20),
  ('Jogger Cargo', 3, 79900, 'SALE', 'Jogger cargo con bolsillos laterales', 10),
  ('Cap Bordada', 4, 34900, '', 'Gorra 5 paneles con bordado personalizado', 50);

INSERT INTO t_p96355905_luti_premium_store.clients (name, email, phone, company) VALUES
  ('Carlos Mejía', 'carlos@email.com', '+57 300 111 2222', 'Mejía Brand'),
  ('Daniela Ríos', 'daniela@email.com', '+57 311 222 3333', NULL),
  ('Andrés Vargas', 'andres@email.com', '+57 322 333 4444', 'Vargas Co'),
  ('Valentina Cruz', 'valentina@email.com', '+57 333 444 5555', NULL),
  ('Miguel Torres', 'miguel@email.com', '+57 344 555 6666', 'Torres Studio');

INSERT INTO t_p96355905_luti_premium_store.orders (order_ref, client_id, status, total) VALUES
  ('#LT-2401', 1, 'Enviado', 269700),
  ('#LT-2402', 2, 'En proceso', 249500),
  ('#LT-2403', 3, 'Pendiente', 149800),
  ('#LT-2404', 4, 'Enviado', 349000),
  ('#LT-2405', 5, 'En proceso', 239600);

INSERT INTO t_p96355905_luti_premium_store.order_items (order_id, product_id, product_name, quantity, unit_price) VALUES
  (1, 1, 'Hoodie Oversize Negro', 3, 89900),
  (2, 2, 'Tee Premium Vintage', 5, 49900),
  (3, 3, 'Sudadera Crewneck', 2, 74900),
  (4, 6, 'Cap Bordada', 10, 34900),
  (5, 4, 'Polo Urbano', 4, 59900);
