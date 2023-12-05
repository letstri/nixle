export interface CookieOptions {
    /**
     * The url path prefix must be absolute. It makes the cookie accessible for pages under that path.
     * By default, it’s the current path.
     *
     * @example
     * '/admin'
     */
    path?: string;
    /**
     * A domain defines where the cookie is accessible. In practice though, there are limitations. We can’t set any domain.
     *
     * @example
     * 'site.com'
     */
    domain?: string;
    /**
     * By default, if a cookie doesn’t have one of this option, it disappears when the browser is closed.
     *
     * @example
     * new Date('2021-01-01')
     */
    expires?: Date;
    /**
     * It’s an alternative to expires and specifies the cookie’s expiration in seconds from the current moment.
     * If set to zero or a negative value, the cookie is deleted.
     *
     * @example
     * 60 * 60 * 24 * 7 // 7 days
     */
    maxAge?: number;
    /**
     * The cookie should be transferred only over HTTPS.
     */
    secure?: boolean;
    /**
     * It’s designed to protect from so-called XSRF (cross-site request forgery) attacks.
     *
     * @summary
     * Strict
     * Means that the browser sends the cookie only for same-site requests, that is, requests originating from the same site that set the cookie. If a request originates from a different domain or scheme (even with the same domain), no cookies with the SameSite=Strict attribute are sent.
     *
     * Lax
     * Means that the cookie is not sent on cross-site requests, such as on requests to load images or frames, but is sent when a user is navigating to the origin site from an external site (for example, when following a link). This is the default behavior if the SameSite attribute is not specified.
     *
     * None
     * means that the browser sends the cookie with both cross-site and same-site requests. The Secure attribute must also be set when setting this value, like so SameSite=None; Secure. If Secure is missing an error will be logged:
     *
     * Cookie "myCookie" rejected because it has the "SameSite=None" attribute but is missing the "secure" attribute.
     *
     * This Set-Cookie was blocked because it had the "SameSite=None" attribute but did not have the "Secure" attribute, which is required in order to use "SameSite=None".
     */
    sameSite?: 'Strict' | 'Lax' | 'None';
    /**
     * This option forbids any JavaScript access to the cookie.
     * We can’t see such a cookie or manipulate it using `document.cookie`.
     */
    httpOnly?: boolean;
}
