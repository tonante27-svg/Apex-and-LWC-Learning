public with sharing class ContactWrapper {
  public class Properties {
    public String contactName;
    public String email;
    public String phone;
    public Boolean isChecked;

    public Properties(String name, String email, String phone) {
      this.contactName = name;
      this.email = email;
      this.phone = phone;
    }
    public void selectContact() {
      isChecked = true;
    }

    public void unselectContact() {
      isChecked = false;
    }
  }
}
//Test: ContactWrapper.Properties cwp = new ContactWrapper.Properties('Erin Shoemacker','eshoemarks@gmail.com','312-560-2471');
