/* eslint no-undef: "off"*/
/* eslint-disable no-unused-expressions */
import $ from "jquery";
import AOS from 'aos';
import jQuery from 'jquery';

$('#backttop').click(function () {
    $("html, body").animate({scrollTop: 0}, 600);
    return false;
});
