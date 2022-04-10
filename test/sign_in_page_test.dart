import 'package:test/test.dart';
import 'package:sign_up_page/sign_in_page.dart';

void main() {
  group('Login', () {
    test('Existing Account, Wrong Pasword', () {
      final login = LoginPage();

      expect(login.CheckSignIn('Mohamed', 'abc'), false);
    });

    test('Existing Account, Correct Pasword', () {
      final login = LoginPage();

      expect(login.CheckSignIn('Mohamed', '123'), true);
    });

    test('Non-Existing Account', () {
      final login = LoginPage();

      expect(login.CheckSignIn('Sara', '123'), false);
    });
  });
}
