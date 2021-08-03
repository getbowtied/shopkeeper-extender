<?php
/**
 * Shopkeeper Social Media Profiles Widget.
 *
 * @package shopkeeper-extender
 */

/**
 * SK_Social_Media_Widget class.
 *
 * @since 1.4
 */
class SK_Social_Media_Widget extends WP_Widget {

	/**
	 * SK_Social_Media_Widget constructor.
	 *
	 * @since 1.4
	 */
	public function __construct() {
		parent::__construct(
			'shopkeeper_social_media', // Base ID.
			esc_html__( 'Shopkeeper Social Media Profiles', 'shopkeeper-extender' ), // Name.
			array( 'description' => esc_html__( 'A widget that displays Social Media Profiles', 'shopkeeper-extender' ) ) // Args.
		);
	}

	/**
	 * Widget output.
	 *
	 * @param array $args Args.
	 * @param mixed $instance Instance.
	 * @since 1.4
	 * @return void
	 */
	public function widget( $args, $instance ) {

		if ( isset( $instance['title'] ) ) {
			$title = apply_filters( 'widget_title', $instance['title'] );
		}

		echo wp_kses_post( $args['before_widget'] );

		if ( ! empty( $title ) ) {
			echo wp_kses_post( $args['before_title'] . $title . $args['after_title'] );
		}

		echo do_shortcode( '[social-media items_align="left"]' );

		echo wp_kses_post( $args['after_widget'] );
	}

	/**
	 * Widget backend output.
	 *
	 * @param mixed $instance Instance.
	 * @since 1.4
	 * @return void
	 */
	public function form( $instance ) {

		if ( isset( $instance['title'] ) ) {
			$title = $instance['title'];
		} else {
			$title = esc_html__( 'Get Connected', 'shopkeeper-extender' );
		}
		?>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php esc_html_e( 'Title:', 'shopkeeper-extender' ); ?></label>
			<input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>">
		</p>

		<?php
	}

	/**
	 * Widget update.
	 *
	 * @param mixed $new_instance New instance.
	 * @param mixed $old_instance Old instance.
	 * @since 1.4
	 * @return array
	 */
	public function update( $new_instance, $old_instance ) {

		$instance          = array();
		$instance['title'] = ( ! empty( $new_instance['title'] ) ) ? wp_strip_all_tags( $new_instance['title'] ) : '';

		return $instance;
	}
}

add_action(
	'widgets_init',
	function() {
		register_widget( 'SK_Social_Media_Widget' );
	}
);
