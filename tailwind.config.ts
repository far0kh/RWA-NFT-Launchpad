import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
    	fontSize: {
    		'heading1-bold': [\n				"50px",\n				{\n					lineHeight: "100%",\n					fontWeight: "700",\n				},\n			],
    		'heading2-bold': [\n				"30px",\n				{\n					lineHeight: "100%",\n					fontWeight: "700",\n				},\n			],
    		'heading3-bold': [\n				"24px",\n				{\n					lineHeight: "100%",\n					fontWeight: "700",\n				},\n			],
    		'heading4-bold': [\n				"20px",\n				{\n					lineHeight: "100%",\n					fontWeight: "700",\n				},\n			],
    		'body-bold': [\n				"18px",\n				{\n					lineHeight: "100%",\n					fontWeight: "700",\n				},\n			],
    		'body-semibold': [\n				"18px",\n				{\n					lineHeight: "100%",\n					fontWeight: "600",\n				},\n			],
    		'body-medium': [\n				"18px",\n				{\n					lineHeight: "100%",\n					fontWeight: "500",\n				},\n			],
    		'base-bold': [\n				"16px",\n				{\n					lineHeight: "100%",\n					fontWeight: "600",\n				},\n			],
    		'base-medium': [\n				"16px",\n				{\n					lineHeight: "100%",\n					fontWeight: "500",\n				},\n			]
    	},
    	extend: {
    		colors: {
    			'white-1': '#F8F8F8 !important',
    			'gray-1': '#616161 !important',
    			'gray-2': '#E5E7EB !important',
    			'green-1': '#16a34a !important',
    			'green-2': '#15803d !important',
    			'blue-1': '#005EBE !important',
    			'blue-2': '#E9F5FE !important',
    			'blue-3': '#F5F7F9 !important',
    			'red-1': '#FF0000 !important',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			},
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
};
export default config;
