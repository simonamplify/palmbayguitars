<?php
function custom_theme_scripts() {
    $parent_handle = 'Divi';
    wp_enqueue_style(
        'child-style',
        get_stylesheet_directory_uri() . '/css/stylesheet.css',
        array( $parent_handle ),
        filemtime( get_stylesheet_directory() . '/css/stylesheet.css' )
    );
    wp_enqueue_script(
        'main-js',
        get_stylesheet_directory_uri() . '/js/main.min.js',
        false,
        filemtime( get_stylesheet_directory() . '/js/main.min.js' ),
        true
    );
    add_filter('script_loader_tag', function($tag, $handle, $src) {
        if ( 'main-js' !== $handle ) return $tag;
        return '<script type="module" src="' . esc_url( $src ) . '"></script>';
    }, 10, 3);
}
add_action( 'wp_enqueue_scripts', 'custom_theme_scripts', 11 ); // 11 to ensure it runs after the parent theme's scripts
// Enqueue login styles
function my_logincustomCSSfile() {
    wp_enqueue_style('login-styles', get_stylesheet_directory_uri() . '/css/login_stylesheet.css');
}
add_action('login_enqueue_scripts', 'my_logincustomCSSfile');
// Change login logo url and title text
function my_loginURL() {
    return '/';
}
add_filter('login_headerurl', 'my_loginURL');
function my_loginURLtext() {
    return 'Palm Bay Guitars';
}
add_filter('login_headertitle', 'my_loginURLtext');

// Create year shortcode
function year() {
    return date("Y");
}
add_shortcode('year', 'year');
// Change sale badge text to
add_filter('woocommerce_sale_flash', 'change_sale_text');
function change_sale_text() {
    return '<span class="onsale">On Sale</span>';
}
// Add cart button to shop archive pages
add_action('woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_add_to_cart', 10);
// Change related products header
add_filter('woocommerce_product_upsells_products_heading', 'custom_related_products_heading');
function custom_related_products_heading() {
    return 'Related Products';
}
// Enable product search
function custom_remove_default_et_pb_custom_search() {
	remove_action( 'pre_get_posts', 'et_pb_custom_search' );
	add_action( 'pre_get_posts', 'custom_et_pb_custom_search' );
}
// Redirect to homepage after login/logout
add_filter('woocommerce_login_redirect', 'login_redirect');
function login_redirect($redirect_to) {
    return home_url();
}
add_action('wp_logout','logout_redirect');
function logout_redirect(){
    wp_redirect( home_url() );
    exit;
}

add_action( 'wp_loaded', 'custom_remove_default_et_pb_custom_search' );
function custom_et_pb_custom_search( $query = false ) {
	if ( is_admin() || ! is_a( $query, 'WP_Query' ) || ! $query->is_search ) {
		return;
	}
	if ( isset( $_GET['et_pb_searchform_submit'] ) ) {
		$postTypes = array();   
		if ( ! isset($_GET['et_pb_include_posts'] ) && ! isset( $_GET['et_pb_include_pages'] ) ) {
            $postTypes = array( 'post' );
        }
		if ( isset( $_GET['et_pb_include_pages'] ) ) {
            $postTypes = array( 'page' );
        }
		if ( isset( $_GET['et_pb_include_posts'] ) ) {
            $postTypes[] = 'post';
        } 
		/* BEGIN Add custom post types */
		$postTypes[] = 'product';
		/* END Add custom post types */
		$query->set( 'post_type', $postTypes );
		if ( ! empty( $_GET['et_pb_search_cat'] ) ) {
			$categories_array = explode( ',', $_GET['et_pb_search_cat'] );
			$query->set( 'category__not_in', $categories_array );
		}
		if ( isset( $_GET['et-posts-count'] ) ) {
			$query->set( 'posts_per_page', (int) $_GET['et-posts-count'] );
		}
	}
}
// Create start table shortcode
function startTable() {
    return '<div class="table">';
}
add_shortcode('startTable', 'startTable');
// Create end table shortcode
function endTable() {
    return '</div>';
}
add_shortcode('endTable', 'endTable');
// Create start table row shortcode
function startRow() {
    return '<div class="tableRow">';
}
add_shortcode('startRow', 'startRow');
// Create end table row shortcode
function endRow() {
    return '</div>';
}
add_shortcode('endRow', 'endRow');
// Create start table cell shortcode
function startCell() {
    return '<div class="tableCell">';
}
add_shortcode('startCell', 'startCell');
// Create end table cell shortcode
function endCell() {
    return '</div>';
}
add_shortcode('endCell', 'endCell');

// Stop wordpress adding <br>
remove_filter( 'the_content', 'wpautop' );
remove_filter( 'the_excerpt', 'wpautop' );

function wpse_wpautop_nobr( $content ) {
    return wpautop( $content, false );
}

add_filter( 'the_content', 'wpse_wpautop_nobr' );
add_filter( 'the_excerpt', 'wpse_wpautop_nobr' );
?>