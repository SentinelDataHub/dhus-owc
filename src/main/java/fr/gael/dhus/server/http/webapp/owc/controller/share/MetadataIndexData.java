package fr.gael.dhus.server.http.webapp.owc.controller.share;

import java.util.ArrayList;
import java.util.List;

public class MetadataIndexData
{
   private String name;
   private String value;
   private List<MetadataIndexData> children;

   public MetadataIndexData ()
   {
   }

   public MetadataIndexData (String name, String value)
   {
      this.name = name;
      this.value = value;
   }

   public List<MetadataIndexData> getChildren()
   {
      return children;
   }

   public void addChild(MetadataIndexData child)
   {
      if (children == null)
      {
         children = new ArrayList<MetadataIndexData>();
      }
      children.add(child);
   }

   public String getName() {
      return name;
   }
   public void setName(String name) {
      this.name = name;
   }
   public String getValue() {
      return value;
   }
   public void setValue(String value) {
      this.value = value;
   }

   @Override
   public boolean equals(Object o)
   {
     if(!(o instanceof MetadataIndexData )){
       return false;
     }

     if(this.getName() == null){
       return false;
     }

     if(((MetadataIndexData)o).getName() == null){
       return false;
     }

     return  ((MetadataIndexData)o).getName().equals(this.getName());
   }

   @Override
   public String toString()
   {
      String res = name;
      if (value != null)
      {
         res += " : "+value;
      }
      return res;
   }
}
