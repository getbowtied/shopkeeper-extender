( function( blocks, i18n, element ) {

	const el = element.createElement;

	/* Blocks */
	const registerBlockType   	= wp.blocks.registerBlockType;

	const InspectorControls 	= wp.editor.InspectorControls;
	const InnerBlock 			= wp.editor.InnerBlocks;
	const ColorSettings			= wp.editor.PanelColorSettings;

	const SelectControl			= wp.components.SelectControl;
	const ToggleControl			= wp.components.ToggleControl;
	const TextControl 			= wp.components.TextControl;
	const Button 				= wp.components.Button;
	const RangeControl			= wp.components.RangeControl;
	const PanelBody				= wp.components.PanelBody;
	const TabPanel 				= wp.components.TabPanel;
	const SVG 					= wp.components.SVG;
	const Path 					= wp.components.Path;

	/* Register Block */
	registerBlockType( 'getbowtied/sk-slider', {
		title: i18n.__( 'Slider' ),
		icon: 'slides',
		category: 'shopkeeper',
		supports: {
			align: [ 'center', 'wide', 'full' ],
		},
		attributes: {
			fullHeight: {
				type: 'boolean',
				default: false
			},
			customHeight: {
				type: 'number',
				default: '800',
			},
			slides: {
				type: 'number',
				default: '3',
			},
			pagination: {
				type: 'boolean',
				default: true
			},
			paginationColor: {
				type: 'string',
				default: '#fff'
			},
			arrows: {
				type: 'boolean',
				default: true
			},
			arrowsColor: {
				type: 'string',
				default: '#fff'
			},
			slideURL: {
	        	type: 'string',
	        	default: '#'
	        },
	        activeTab: {
	        	type: 'number',
	        	default: '1'
	        }
		},

		edit: function( props ) {

			var attributes = props.attributes;

			function getTabs() {

				let tabs = [];

				let icons = [
					{ 'tab': '1', 'code': 'M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm11 10h2V5h-4v2h2v8zm7-14H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14z' },
					{ 'tab': '2', 'code': 'M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14zm-4-4h-4v-2h2c1.1 0 2-.89 2-2V7c0-1.11-.9-2-2-2h-4v2h4v2h-2c-1.1 0-2 .89-2 2v4h6v-2z' },
					{ 'tab': '3', 'code': 'M21 1H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14zM3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm14 8v-1.5c0-.83-.67-1.5-1.5-1.5.83 0 1.5-.67 1.5-1.5V7c0-1.11-.9-2-2-2h-4v2h4v2h-2v2h2v2h-4v2h4c1.1 0 2-.89 2-2z' },
					{ 'tab': '4', 'code': 'M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm12 10h2V5h-2v4h-2V5h-2v6h4v4zm6-14H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14z' },
					{ 'tab': '5', 'code': 'M21 1H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14zM3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm14 8v-2c0-1.11-.9-2-2-2h-2V7h4V5h-6v6h4v2h-4v2h4c1.1 0 2-.89 2-2z' },
					{ 'tab': '6', 'code': 'M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14zm-8-2h2c1.1 0 2-.89 2-2v-2c0-1.11-.9-2-2-2h-2V7h4V5h-4c-1.1 0-2 .89-2 2v6c0 1.11.9 2 2 2zm0-4h2v2h-2v-2z' },
				];

				for( let i = 1; i <= attributes.slides; i++ ) {
					tabs.push(
						el( 'a',
							{
				                key: 'slide' + i,
				                className: 'slide-tab slide-' + i,
				                'data-tab': i,
				                onClick: function() {				                	
                    				props.setAttributes({ activeTab: i });
                                },
				            },
				            el( SVG,
				            	{
				            		xmlns:"http://www.w3.org/2000/svg",
				            		viewBox:"0 0 24 24"
				            	},
				            	el( Path,
				            		{
				            			d: icons[i-1]['code']
				            		}
				            	)
				            ),
			            )
					);
				}

				return tabs;
			} 

			function getTemplates() {
				let n = [];

                for ( let i = 1; i <= attributes.slides; i++ ) {
                	n.push(["getbowtied/slide", {
                        tabNumber: i
                    }]);
                }

                return n;
			}

			function getColors() {

				let colors = [];

				if( attributes.pagination ) {
					colors.push(
						{ 
							label: i18n.__( 'Pagination Bullets' ),
							value: attributes.paginationColor,
							onChange: function( newColor) {
								props.setAttributes( { paginationColor: newColor } );
							},
						}
					);
				}

				if( attributes.arrows ) {
					colors.push(
						{ 
							label: i18n.__( 'Navigation Arrows' ),
							value: attributes.arrowsColor,
							onChange: function( newColor) {
								props.setAttributes( { arrowsColor: newColor } );
							},
						}
					);
				}

				return colors;
			}

			return [
				el(
					InspectorControls,
					{ 
						key: 'gbt_18_sk_slider_inspector'
					},
					el(
						'div',
						{
							className: 'products-main-inspector-wrapper',
						},
						el(
							ToggleControl,
							{
								key: "gbt_18_sk_slider_full_height",
								label: i18n.__( 'Full Height' ),
								checked: attributes.fullHeight,
								onChange: function() {
									props.setAttributes( { fullHeight: ! attributes.fullHeight } );
								},
							}
						),
						attributes.fullHeight === false &&
						el(
							RangeControl,
							{
								key: "gbt_18_sk_slider_custom_height",
								value: attributes.customHeight,
								allowReset: false,
								initialPosition: 800,
								min: 100,
								max: 1000,
								label: i18n.__( 'Custom Desktop Height' ),
								onChange: function( newNumber ) {
									props.setAttributes( { customHeight: newNumber } );
								},
							}
						),
						el(
							RangeControl,
							{
								key: "gbt_18_sk_slider_slides",
								value: attributes.slides,
								allowReset: false,
								initialPosition: 3,
								min: 1,
								max: 6,
								label: i18n.__( 'Number of Slides' ),
								onChange: function( newNumber ) {
									props.setAttributes( { slides: newNumber } );
									props.setAttributes( { activeTab: '1' } );
								},
							}
						),
						el(
							ToggleControl,
							{
								key: "gbt_18_sk_slider_pagination",
	              				label: i18n.__( 'Pagination Bullets' ),
	              				checked: attributes.pagination,
	              				onChange: function() {
									props.setAttributes( { pagination: ! attributes.pagination } );
								},
							}
						),
						el(
							ToggleControl,
							{
								key: "gbt_18_sk_slider_arrows",
	              				label: i18n.__( 'Navigation Arrows' ),
	              				checked: attributes.arrows,
	              				onChange: function() {
									props.setAttributes( { arrows: ! attributes.arrows } );
								},
							}
						),
						el(
							ColorSettings,
							{
								key: 'gbt_18_sk_slider_arrows_color',
								title: i18n.__( 'Colors' ),
								initialOpen: false,
								colorSettings: getColors()
							},
						),
					),
				),
				el( 'div',
					{
						key: 				'gbt_18_sk_editor_slider_wrapper',
						className: 			'gbt_18_sk_editor_slider_wrapper',
						'data-tab-active': 	attributes.activeTab
					},
					el( 'div',
						{
							key: 		'gbt_18_sk_editor_slider_tabs',
							className: 	'gbt_18_sk_editor_slider_tabs'
						},
						getTabs()
					),
					el(
						InnerBlock,
						{
							key: 'gbt_18_sk_editor_slider_inner_blocks ',
							template: getTemplates(),
	                        templateLock: "all",
	            			allowedBlocksNames: ["getbowtied/slide"]
						},
					),
				),
			];
		},

		save: function( props ) {
			attributes = props.attributes;
			return el( 
				'div',
				{
					key: 'gbt_18_sk_slider_wrapper',
					className: 'gbt_18_sk_slider_wrapper'
				},
				el( 
					'div',
					{
						key: 'gbt_18_sk_slider_container',
						className: attributes.fullHeight ? 'shortcode_getbowtied_slider gbt_18_sk_slider_container swiper-container full_height' : 'shortcode_getbowtied_slider gbt_18_sk_slider_container swiper-container',
						style:
						{
							height: attributes.customHeight + 'px'
						}
					},
					el(
						'div',
						{
							key: 'swiper-wrapper',
							className: 'swiper-wrapper'
						},
						el( InnerBlock.Content, { key: 'slide-content' } )
					),
					!! attributes.arrows && el(
						'div',
						{
							key: 'swiper-button-prev',
							className: 'swiper-button-prev',
							style:
							{
								color: attributes.arrowsColor
							}
						},
						el(
							'i',
							{
								key: 'spk-icon-left-arrow-thin-large',
								className: 'spk-icon spk-icon-left-arrow-thin-large',
							}
						)
					),
					!! attributes.arrows && el(
						'div',
						{
							key: 'swiper-button-next',
							className: 'swiper-button-next',
							style:
							{
								color: attributes.arrowsColor
							}
						},
						el(
							'i',
							{
								key: 'spk-icon-right-arrow-thin-large',
								className: 'spk-icon spk-icon-right-arrow-thin-large',
							}
						)
					),
					!! attributes.pagination && el(
						'div',
						{
							key: 'shortcode-slider-pagination',
							className: 'quickview-pagination shortcode-slider-pagination',
							style:
							{
								color: attributes.paginationColor
							}
						}
					)
				)
			);
		},
	} );

} )(
	window.wp.blocks,
	window.wp.i18n,
	window.wp.element
);