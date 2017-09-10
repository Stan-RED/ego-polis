using Codesophy.Model;
using System;
using Xunit;

namespace Codesophy.Configuration
{
    public class AppSettingTests
    {
        const string NAME = "SettingName";
        const string VALUE = "SettingValue";

        [Fact]
        public void Ctor_MissingName_ThrowsException()
        {
            var e = Assert.ThrowsAny<ArgumentNullException>(
                () => new AppSetting<string>(null)
            );

            Assert.Equal("name", e.ParamName);
        }

        [Fact]
        public void Ctor_ExistingName_PropagatedToProperty()
        {
            IHasName named = new AppSetting<string>(NAME);

            Assert.Equal(NAME, named.Name);
        }

        [Fact]
        public void Ctor_ValueExists_PropagateAndExists()
        {
            ISetting<string> setting = new AppSetting<string>(NAME, VALUE);

            Assert.Equal(VALUE, setting.Value);
            Assert.True(setting.Exists);
        }

        [Fact]
        public void Ctor_ValueNotExists_StatedAsNotExists()
        {
            ISetting<string> setting = new AppSetting<string>(NAME);

            Assert.False(setting.Exists);
        }
    }
}
