#ifndef CHAR_TRAITS_FIX_HPP
#define CHAR_TRAITS_FIX_HPP

#include <string>

namespace std {
    template<>
    struct char_traits<unsigned char> {
        using char_type = unsigned char;
        using int_type = int;
        using off_type = streamoff;
        using pos_type = streampos;
        using state_type = mbstate_t;

        static void assign(char_type& c1, const char_type& c2) noexcept { c1 = c2; }
        static bool eq(const char_type& c1, const char_type& c2) noexcept { return c1 == c2; }
        static bool lt(const char_type& c1, const char_type& c2) noexcept { return c1 < c2; }

        static int compare(const char_type* s1, const char_type* s2, size_t n) {
            for (size_t i = 0; i < n; ++i) {
                if (lt(s1[i], s2[i])) return -1;
                if (lt(s2[i], s1[i])) return 1;
            }
            return 0;
        }

        static size_t length(const char_type* s) {
            size_t len = 0;
            while (!eq(s[len], char_type(0))) ++len;
            return len;
        }

        static const char_type* find(const char_type* s, size_t n, const char_type& a) {
            for (size_t i = 0; i < n; ++i) if (eq(s[i], a)) return s + i;
            return nullptr;
        }

        static char_type* move(char_type* s1, const char_type* s2, size_t n) {
            memmove(s1, s2, n);
            return s1;
        }

        static char_type* copy(char_type* s1, const char_type* s2, size_t n) {
            memcpy(s1, s2, n);
            return s1;
        }

        static char_type* assign(char_type* s, size_t n, char_type a) {
            for (size_t i = 0; i < n; ++i) s[i] = a;
            return s;
        }

        static int_type not_eof(const int_type& c) noexcept {
            return (c != -1) ? c : 0;
        }

        static char_type to_char_type(const int_type& c) noexcept {
            return static_cast<char_type>(c);
        }

        static int_type to_int_type(const char_type& c) noexcept {
            return static_cast<int_type>(c);
        }

        static bool eq_int_type(const int_type& c1, const int_type& c2) noexcept {
            return c1 == c2;
        }

        static int_type eof() noexcept { return -1; }
    };
}

#endif // CHAR_TRAITS_FIX_HPP