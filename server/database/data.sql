
-- CREATE TABLE Entry_data (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(50) NOT NULL,
--     email VARCHAR(100),
--     slack_user VARCHAR(50),
--     phone_number NUMERIC(20),
--     status VARCHAR(4) DEFAULT 'out',
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- )

-- CREATE TABLE form_data (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(50) NOT NULL,
--     email VARCHAR(100),
--     slack_user VARCHAR(50),
--     phone_number NUMERIC(20),
--     status VARCHAR(3) DEFAULT 'in',
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- table structure for bedford key holder
CREATE TABLE bedford_keyHolders (
    id SERIAL PRIMARY KEY,
    slack_user VARCHAR(50),
    phone_number NUMERIC(20),
    status VARCHAR(4) DEFAULT 'out',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

-- table structure for guest help to open door
CREATE TABLE bedford_guest (
    id SERIAL PRIMARY KEY,
    slack_user VARCHAR(50),
    phone_number NUMERIC(20),
    status VARCHAR(3) DEFAULT 'in',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

-- table structure for cititec key holder 
CREATE TABLE cititec_keyHolders (
    id SERIAL PRIMARY KEY,
    slack_user VARCHAR(50),
    phone_number NUMERIC(20),
    status VARCHAR(4) DEFAULT 'out',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)