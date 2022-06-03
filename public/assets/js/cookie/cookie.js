
var options = {
    title: trads.yourC,
    message: trads.cookMsg,
    delay: 600,
    expires: 365,
    link: '/fr/7_24/5fc0d460551f334baef12000/cgu.html',
    onAccept: function(){
        var myPreferences = $.fn.ihavecookies.cookie();
    },
    uncheckBoxes: true,
    acceptBtnLabel: trads.valid,
    moreInfoLabel: trads.plus,
    cookieTypesTitle: null,
    advancedBtnLabel:trads.params,
    fixedCookieTypeLabel:trads.indis,
    fixedCookieTypeDesc: 'These are essential for the website to work correctly.',
    cookieTypes: [
        {
            type: 'Analytics',
            value: 'marketing',
            description: 'Cookies related to site visits, browser types, etc.'
        }
    ],
}
$(document).ready(function() {
    $('body').ihavecookies(options);
    if ($.fn.ihavecookies.preference('marketing') === true) {}
    if ($.fn.ihavecookies.preference('functionality') === true) {}
    $('#ihavecookiesBtn').on('click', function(){
        $('body').ihavecookies(options, 'reinit');
    });
});