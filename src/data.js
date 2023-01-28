import * as icon from 'react-icons/si'
import * as iconb from 'react-icons/bi'
import * as iconfa from 'react-icons/fa'

const profile = {
	name: 'Kotka op.',
	role: 'Decision and times junction',
	description: 'For us. For those, whose patience feeds ambitions.',
};

const social = [
	{ icon: icon.SiTwitter, link: 'https://www.twitter.com/' },
	{ icon: icon.SiInstagram, link: 'https://www.instagram.com/' },
	{ icon: icon.SiTiktok, link: 'https://www.tiktok.com/' },
];

const brand = 'Korp.'


const work = [
	{
		name: 'Feles Pecunia',
		description: 'Christ des gouttieres. La fortune ne lui suffisait pas.. On disait que son but etait le plus rudes que nous avions entendus...',
		url: '/images/kot_black.png',
		stack: [
			{ icon: iconb.BiCheckShield, name: 'Sekurity' },
			{ icon: iconb.BiGasPump, name: 'Stacking' },
		],
		linkProject: 'https://testnets.opensea.io/fr/collection/kotka',
		linkGithub: 'https://testnets.opensea.io/fr/collection/kotka',
	},
	{
		name: 'Feles Comercian',
		description: 'Trading troop for senior swinger. All day settings and calls record. With daily interventions live and automatised.',
		url: '/images/kot_blue.png',
		stack: [
			{ icon: iconb.BiBrain, name: 'Klub' },
			{ icon: iconb.BiBot, name: 'Kot' },
			{ icon: iconb.BiGasPump, name: 'Stacking' },
		],
		linkProject: 'https://testnets.opensea.io/fr/collection/kotka',
		linkGithub: 'https://testnets.opensea.io/fr/collection/kotka',
	},
	{
		name: 'Feles Temporis',
		description: 'Comfortable prospective and long term visions. Protect the K-dom is the key of prosperity.',
		url: '/images/kot_red.png',
		stack: [
			{ icon: iconb.BiBrain, name: 'Klub' },
			{ icon: iconb.BiBot, name: 'Kot' },
			{ icon: iconb.BiCheckShield, name: 'Sekurity' },
			{ icon: iconb.BiGasPump, name: 'Stacking' },
		],
		linkProject: 'https://testnets.opensea.io/fr/collection/kotka',
		linkGithub: 'https://testnets.opensea.io/fr/collection/kotka',
	},
	{
		name: 'F3Lz',
		description: 'Sniper scalper strater stoper slater Kotka. Aggressive on hidden FVG. Give him the GO. He will go for it.',
		url: '/images/kot_green.png',
		stack: [
			{ icon: iconb.BiBot, name: 'Kot' },
			{ icon: iconb.BiGasPump, name: 'Stacking' },
		],
		linkProject: 'https://testnets.opensea.io/fr/collection/kotka',
		linkGithub: 'https://testnets.opensea.io/fr/collection/kotka',
	},
	{
		name: 'Feles Lucio',
		description: 'Cras leo mauris, gravida vel lectus ac, congue luctus odio. Sed varius varius est eget convallis sagittis sit amet.',
		url: '/images/kot_gold.png',
		stack: [
			{ icon: iconb.BiCheckShield, name: 'Sekurity' },
			{ icon: iconb.BiGasPump, name: 'Stacking' },
		],
		linkProject: 'https://testnets.opensea.io/fr/collection/kotka',
		linkGithub: 'https://testnets.opensea.io/fr/collection/kotka',
	},
	{
		name: 'Feles Nucleo',
		description: 'Cras leo mauris, gravida vel lectus ac, congue luctus odio. Sed varius varius est eget convallis sagittis sit amet.',
		url: '/images/kot_fluor.png',
		stack: [
			{ icon: iconb.BiCheckShield, name: 'Sekurity' },
			{ icon: iconb.BiGasPump, name: 'Stacking' },
		],
		linkProject: 'https://testnets.opensea.io/fr/collection/kotka',
		linkGithub: 'https://testnets.opensea.io/fr/collection/kotka',
	},
	{
		name: 'Feles Aqua',
		description: 'Cras leo mauris, gravida vel lectus ac, congue luctus odio. Sed varius varius est eget convallis sagittis sit amet.',
		url: '/images/kot_whale.png',
		stack: [
			{ icon: iconb.BiCheckShield, name: 'Sekurity' },
			{ icon: iconb.BiGasPump, name: 'Stacking' },
		],
		linkProject: 'https://testnets.opensea.io/fr/collection/kotka',
		linkGithub: 'https://testnets.opensea.io/fr/collection/kotka',
	},
	{
		name: 'Feles Rocky',
		description: 'Cras leo mauris, gravida vel lectus ac, congue luctus odio. Sed varius varius est eget convallis sagittis sit amet.',
		url: '/images/kot_rock.png',
		stack: [
			{ icon: iconb.BiCheckShield, name: 'Sekurity' },
			{ icon: iconb.BiGasPump, name: 'Stacking' },
		],
		linkProject: 'https://testnets.opensea.io/fr/collection/kotka',
		linkGithub: 'https://testnets.opensea.io/fr/collection/kotka',
	},

]


const stack = [
	{
		name: 'Us and...',
		items: [
			{ icon: iconfa.FaEthereum, name: 'Ethereum Network' },
			{ icon: iconfa.FaApple, name: 'IOS adapted' },
			{ icon: iconfa.FaAndroid, name: 'Android adapted', },
			{ icon: iconfa.FaPaypal, name: 'Paypal' },
		],
	},
	/* {
		name: '2.',
		items: [
			{ icon: icon.SiNodedotjs, name: 'NodeJS' },
			{ icon: icon.SiDeno, name: 'Deno' },
			{ icon: icon.SiMongodb, name: 'MongoDB', },
			{ icon: icon.SiFirebase, name: 'Firebase', },
		],
	}, */
]

const contact = {
	description: 'Anything to propose ? An idea that could help us ? Feel free to text us and explain how we could improve our service. We read and answer to all members of our community :)',
	email: 'kotka@email.com'
}

export { profile, social, work, stack, contact, brand }