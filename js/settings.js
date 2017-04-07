var game_settings = {
	'info': {
		'version': '0.7 alpha',
		'last_release': '24. 12. 2015'
	},

	'stars_settings': {
		'white': 300,
		'yellow': 75,
		'blue': 50,
		'red': 25
	},

	'big_bang': {
		'speed': 3, // integers only!
		'text': 'The Big Bang Theory is the leading explanation about how the universe began. \n At its simplest, it talks about the universe as we know it starting with a small singularity, then inflating over the next 13.8 billion years to the cosmos that we know today.'
	},

	'big_crunch': {
		'speed': 1, // integers only!
		'text': 'Oh, the Universe collapses!'
	},
	
	'added_objects': [
	
	],

	'objects': [{
		'id': 'blue_giant',
		'image': './design/images/blue_giant.png',
		'width': 75,
		'height': 75,
		'real_width': 90,
		'real_height': 90,
		'info': 'Blue giant',
		'mass': 20 * 330000,
		'rotate': false
	}, {
		'id': 'the_sun',
		'image': './design/images/the_sun.png',
		'width': 75,
		'height': 75,
		'real_width': 65,
		'real_height': 65,
		'info': 'The Sun',
		'mass': 330000,
		'rotate': false
	}, {
		'id': 'mars_planet',
		'image': './design/images/mars_planet.png',
		'width': 75,
		'height': 75,
		'real_width': 25,
		'real_height': 25,
		'info': 'Mars',
		'mass': 0.107,
		'rotate': false
	}, {
		'id': 'earth_planet',
		'image': './design/images/earth_planet.png',
		'width': 75,
		'height': 75,
		'real_width': 35,
		'real_height': 35,
		'info': 'Earth',
		'mass': 1,
		'rotate': false
	},

	{
		'id': 'moon',
		'image': './design/images/moon.png',
		'width': 75,
		'height': 75,
		'real_width': 15,
		'real_height': 15,
		'info': 'Moon',
		'mass': 0.01230314690256,
		'rotate': false
	}, {
		'id': 'jupiter_planet',
		'image': './design/images/jupiter_planet.png',
		'width': 75,
		'height': 75,
		'real_width': 65,
		'real_height': 65,
		'info': 'Jupiter',
		'mass': 317.8,
		'rotate': false
	},

	{
		'id': 'neptune_planet',
		'image': './design/images/neptune.png',
		'width': 75,
		'height': 75,
		'real_width': 65,
		'real_height': 65,
		'info': 'Neptune',
		'mass': 17.15,
		'rotate': false
	},

	{
		'id': 'blackhole',
		'image': './design/images/blackhole.png',
		'width': 75,
		'height': 75,
		'real_width': 150,
		'real_height': 150,
		'info': 'Blackhole',
		'mass': 20 * 40e30,
		'rotate': true,
		'rotateAngle': 0
	}, {
		'id': 'iss',
		'image': './design/images/iss.png',
		'width': 75,
		'height': 75,
		'real_width': 15,
		'real_height': 15,
		'info': 'ISS space station',
		'mass': 450000,
		'rotate': false
	}, {
		'id': 'asteroid',
		'image': './design/images/asteroid.png',
		'width': 75,
		'height': 75,
		'real_width': 15,
		'real_height': 15,
		'info': 'Asteroid',
		'mass': 450000,
		'rotate': true,
		'rotateAngle': 0
	}, {
		'id': 'neutron_star',
		'image': './design/images/neutron_star.png',
		'width': 75,
		'height': 75,
		'real_width': 40,
		'real_height': 40,
		'info': 'Neutron star',
		'mass': 2.99 * 10e30,
		'rotate': false
	}, {
		'id': 'helium_star',
		'image': './design/images/helium_star.png',
		'width': 75,
		'height': 75,
		'real_width': 130,
		'real_height': 130,
		'info': 'Helium star',
		'mass': 0.995 * 10e30,
		'rotate': false
	}
	]
	
};