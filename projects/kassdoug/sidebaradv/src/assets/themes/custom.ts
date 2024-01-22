export const customTheme = `
.custom{

    &.adv-sidebar-content {
      .sidebar {
        .btn-showhide {
          i {
            color: color_font !important;
          }
        }
  
        .content-links {
          background: color_base !important;
          color: color_font !important;
   
          .header { 
            color: color_font !important;
          }
        }
      }
  
      .content {
        .topbar {
          background: color_base_topbar !important;
          color: color_font !important;
  
          .btn-showhide {
            color: color_font !important;
          }
        }
      }
    } 
  

    &.adv-links {
      color: color_font;
  
      .label-area {  
        .icon {
          background: color_base_link_icon !important;     
        } 
      }
  
      .adv-btn-expand {
        color: color_font !important;
        background-color: color_base_link !important;

        &.active,
        &:hover {
          background-color: color_back_link !important;
        }
      }
  
      .adv-btn-link {
        background-color: color_base_link !important;
        color: color_font !important;
  
        &.active,
        &:hover {
          background-color: color_back_link !important;
        }
      }
  
      .adv-links-sub {
        .adv-links {
          .adv-btn-link {  
            background: color_base_link !important;
            color: color_font !important;
  
            &:hover {
              background-color: color_back_link !important;
            }
          }
        }
      }
  
      .divider {
        border-image-source: color_border !important;
      }
    }
  
  }
`;
