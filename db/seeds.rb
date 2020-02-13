# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
chance = User.create(username: 'chance', password: 'password', profile_icon: '/images/ping_pong_1.jpg')
gavin = User.create(username: 'gavin', password: 'password1', profile_icon: '/images/ping_pong_1.jpg')

flatiron_pingpong = Organization.create(name: 'Flatiron Ping-Pong', icon_url: "https://upload.wikimedia.org/wikipedia/commons/6/61/FS_wiki.png")

flatiron_pingpong.users << chance
flatiron_pingpong.users << gavin




