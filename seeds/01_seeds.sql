INSERT INTO users (name, email, password)
VALUES ('Anne', 'anne@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Bob', 'bob@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Charlie', 'charlie@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES (1, 'Beach House', 'description1', 'example_pic1.jpg', 'example_pic2.jpg', 250, 1, 1, 3, 'Canada', '123 Street', 'Toronto', 'Ontario', 'A1B 2C3'),
(3, 'Downtown Condo', 'description2', 'example_pic3.jpg', 'example_pic4.jpg', 150, 1, 1, 1, 'Canada', '456 Ave', 'Vancouver', 'British Columbia', 'D4E 5F6'),
(1, 'Mountain Chalet', 'description3', 'example_pic5.jpg', 'example_pic6.jpg', 350, 2, 2, 3, 'Canada', '789 Crescent', 'Big White', 'British Columbia', 'G7H 8I9');

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2021-07-07', '2022-07-12', 1, 2),
('2021-03-01', '2022-03-03', 2, 1),
('2021-02-02', '2022-02-09', 1, 3);

INSERT INTO property_reviews (property_id, guest_id, reservation_id, rating, message)
VALUES (3, 3, 3, 10, 'message1'),
(2, 1, 2, 8, 'message2'),
 (1, 2, 1, 9, 'message3');
